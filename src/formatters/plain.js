import { isObject } from '../utils.js';

const buildFormatValue = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const buildPlain = (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes.flatMap((node) => {
      const {
        name, status, children, value,
      } = node;

      const propertys = path ? `${path}.${name}` : name;

      switch (status) {
        case 'unchanged':
          return children ? iter(children, propertys) : [];

        case 'deleted':
          return `Property '${propertys}' was removed`;

        case 'added':
          return `Property '${propertys}' was added with value: ${buildFormatValue(value)}`;

        case 'modified':
          return `Property '${propertys}' was updated. From ${buildFormatValue(node.oldValue)} to ${buildFormatValue(node.newValue)}`;

        default:
          throw new Error(`Unknown status: ${status}.`);
      }
    });

    return lines.filter(Boolean).join('\n');
  };

  return iter(tree, '');
};

export default buildPlain;
