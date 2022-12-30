import { readFile, toJson } from './fs/fileSystem.js';
import stringify from './stringify.js';

const diff = (json1, json2) => {
  const keys = Object.keys({ ...json1, ...json2 });
  const uniqSort = keys.filter((key, index) => keys.indexOf(key) === index);
  const sortKeys = uniqSort.sort();

  return sortKeys.reduce(
    (acc, key) => {
      const value1 = json1[key];
      const value2 = json2[key];

      if (value1 === value2) {
        acc.push({ sign: ' ', key: key, value: value1 });
      } else if (!json2.hasOwnProperty(key)) {
        acc.push({ sign: '-', key: key, value: value1 });
      } else if (!json1.hasOwnProperty(key)) {
        acc.push({ sign: '+', key: key, value: value2 });
      } else if (value1 !== value2) {
        acc.push({ sign: '-', key: key, value: value1 }, { sign: '+', key: key, value: value2 });
      }

      return acc;
    },
    [],
  );
};

export default (filepath1, filepath2) => {
  const content1 = toJson(readFile(filepath1));
  const content2 = toJson(readFile(filepath2));

  return stringify(diff(content1, content2));
};
