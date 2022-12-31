import makeNode from './entities/node.js';

export default (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();
  return keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      acc.push(makeNode(key, value1));
    } else if (!obj2[key]) {
      acc.push(makeNode(key, value1, '-'));
    } else if (!obj1[key]) {
      acc.push(makeNode(key, value2, '+'));
    } else {
      acc.push(makeNode(key, value1, '-'), makeNode(key, value2, '+'));
    }

    return acc;
  }, []);
};
