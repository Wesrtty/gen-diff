import _ from 'lodash';
import statuses from '../entities/statuses.js';
import {
  getName, getChildren, getStatus, getOldValue, getNewValue, getValue,
} from '../entities/node.js';

const replacer = ' ';
const spacesCount = 4;

const buildLine = (indent, status, name, value) => `${indent}${status} ${name}: ${value}`;

const getdIndent = (depth) => replacer.repeat(depth * spacesCount - 2);

const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
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

export default (tree) => {
  const iter = (nodes, depth = 1) => {
    const buildNesting = (children, value) => (children
      ? iter(children, depth + 1)
      : stringify(value, depth + 1));

    const indent = getdIndent(depth);
    const bracketIndent = getBracketIndent(depth);

    const lines = nodes.flatMap((node) => {
      const name = getName(node);
      const status = getStatus(node);
      const values = buildNesting(getChildren(node), getValue(node));

      switch (status) {
        case statuses.unchanged:
          return buildLine(indent, ' ', name, values);

        case statuses.deleted:
          return buildLine(indent, '-', name, values);

        case statuses.added:
          return buildLine(indent, '+', name, values);

        case statuses.modified:
          return [
            buildLine(indent, '-', name, stringify(getOldValue(node), depth + 1)),
            buildLine(indent, '+', name, stringify(getNewValue(node), depth + 1)),
          ];

        default:
          throw new Error(`Unknown status: ${status}.`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(tree);
};
