import _ from 'lodash';
import { makeNode, makeNodeLeaf, makeNodeInternal } from './entities/node.js';

const isObject = (value) => (typeof value === 'object' && !Array.isArray(value) && value !== null);

const buildDiff = (obj1, obj2 = {}) => {
  const uniqKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return uniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (isObject(value1) && isObject(value2)) {
      return makeNodeInternal(key, 'unchanged', buildDiff(value1, value2));
    }

    if (!_.has(obj2, key)) {
      return makeNode(key, 'deleted', value1);
    }

    if (!_.has(obj1, key)) {
      return makeNode(key, 'added', value2);
    }

    if (value1 === value2) {
      return makeNode(key, 'unchanged', value1);
    }

    return makeNodeLeaf(key, 'modified', value1, value2);
  });
};

export default buildDiff;
