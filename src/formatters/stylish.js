import { isObject } from '../utils.js';

const replacer = ' ';
const spacesCount = 4;

const buildLine = (indent, status, name, value) => `${indent}${status} ${name}: ${value}`;

const getdIndent = (depth) => replacer.repeat(depth * spacesCount - 2);

const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return `${value}`;
  }

  const indent = getdIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = Object
    .entries(value)
    .map(([key, val]) => {
      const children = stringify(val, depth + 1);
      return buildLine(indent, ' ', key, children);
    });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const buildStylish = (tree) => {
  const iter = (nodes, depth = 1) => {
    const buildNesting = (children, value) => (children
      ? iter(children, depth + 1)
      : stringify(value, depth + 1));

    const indent = getdIndent(depth);
    const bracketIndent = getBracketIndent(depth);

    const lines = nodes.flatMap((node) => {
      const {
        name, status, children, value,
      } = node;

      const values = buildNesting(children, value);

      switch (status) {
        case 'unchanged':
          return buildLine(indent, ' ', name, values);

        case 'deleted':
          return buildLine(indent, '-', name, values);

        case 'added':
          return buildLine(indent, '+', name, values);

        case 'modified':
          return [
            buildLine(indent, '-', name, stringify(node.oldValue, depth + 1)),
            buildLine(indent, '+', name, stringify(node.newValue, depth + 1)),
          ];

        default:
          throw new Error(`Unknown status: ${status}.`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(tree);
};

export default buildStylish;
