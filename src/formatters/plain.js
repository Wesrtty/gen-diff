import { isObject } from '../utils.js';
import statuses from '../entities/statuses.js';
import {
  getChildren, getName, getNewValue, getOldValue, getStatus, getValue,
} from '../entities/node.js';

const buildFormatValue = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (tree) => {
  const iter = (nodes, currentPath) => {
    const lines = nodes.flatMap((node) => {
      const name = getName(node);
      const status = getStatus(node);
      const children = getChildren(node);

      const propertys = currentPath ? `${currentPath}.${name}` : name;

      switch (status) {
        case statuses.unchanged:
          return children ? iter(children, propertys) : [];

        case statuses.deleted:
          return `Property '${propertys}' was removed`;

        case statuses.added:
          return `Property '${propertys}' was added with value: ${buildFormatValue(getValue(node))}`;

        case statuses.modified:
          return `Property '${propertys}' was updated. From ${buildFormatValue(getOldValue(node))} to ${buildFormatValue(getNewValue(node))}`;

        default:
          throw new Error(`Unknown status: ${status}.`);
      }
    });

    return lines.filter(Boolean).join('\n');
  };

  return iter(tree, '');
};
