import { isAbsolute } from 'path';
import fs from 'fs';
import parseToJSON from './parsers/index.js';
import { getContent, getExtension, makeFile } from './entities/file.js';

const isObject = (value) => (typeof value === 'object' && !Array.isArray(value) && value !== null);

const buildAbsolutePath = (filePath) => [process.cwd(), filePath].join('/');

const isExistFile = (filePath) => fs.existsSync(filePath);

const readFile = (filePath) => fs.readFileSync(filePath, { encoding: 'utf-8' });

const getContentFile = (filePath) => {
  const absolutePath = isAbsolute(filePath) ? filePath : buildAbsolutePath(filePath);

  if (!isExistFile(absolutePath)) {
    throw new Error(`File "${absolutePath}" not found`);
  }

  const file = makeFile(readFile(absolutePath), absolutePath);
  return parseToJSON(getContent(file), getExtension(file));
};

export { isObject, getContentFile };
