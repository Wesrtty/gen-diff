import path from 'path';
import fs from 'fs';
import parseToJson from './parsers/index.js';
import compareObjects from './compareObjects.js';
import buildOutputFormat from './formatters/index.js';

const readFile = (pathToFile) => {
  const absolutePath = path.resolve(process.cwd(), pathToFile);
  return fs.readFileSync(absolutePath, { encoding: 'utf-8' });
};

const getExtname = (pathToFile) => path.extname(pathToFile).slice(1);

export default (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  try {
    const fileExtname1 = getExtname(pathToFile1);
    const content1 = parseToJson(readFile(pathToFile1), fileExtname1);

    const fileExtname2 = getExtname(pathToFile2);
    const content2 = parseToJson(readFile(pathToFile2), fileExtname2);

    const diff = compareObjects(content1, content2);
    return buildOutputFormat(diff, outputFormat);
  } catch (e) {
    throw new Error(e);
  }
};
