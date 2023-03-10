import _ from 'lodash';
import { makeNode, makeNodeLeaf, makeNodeInternal } from './entities/node.js';
import statuses from './entities/statuses.js';

const compareObjects = (obj1, obj2) => {
  const uniqKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return uniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return makeNodeInternal(key, statuses.unchanged, compareObjects(value1, value2));
    }

    if (!_.has(obj2, key)) {
      return makeNode(key, statuses.deleted, value1);
    }

    if (!_.has(obj1, key)) {
      return makeNode(key, statuses.added, value2);
    }

    if (value1 === value2) {
      return makeNode(key, statuses.unchanged, value1);
    }

    return makeNodeLeaf(key, statuses.modified, value1, value2);
  });
};

export default compareObjects;
