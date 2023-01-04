import { makeNode, makeNodeLeaf, makeNodeInternal } from './entities/node.js';

const isObject = (value) => (typeof value === 'object' && !Array.isArray(value) && value !== null);

const buildDiff = (obj1, obj2 = {}) => {
  const uniqKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  return uniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isObject(value1) && isObject(value2)) {
      return makeNodeInternal(key, 'unchanged', buildDiff(value1, value2));
    }

    if (!obj2.hasOwnProperty(key)) {
      return makeNode(key, 'deleted', value1);
    }

    if (!obj1.hasOwnProperty(key)) {
      return makeNode(key, 'added', value2);
    }

    if (value1 === value2) {
      return makeNode(key, 'unchanged', value1);
    }

    return makeNodeLeaf(key, 'modified', value1, value2);
  });
};

export default buildDiff;
