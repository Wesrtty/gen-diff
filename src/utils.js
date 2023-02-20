import path from 'path';
import fs from 'fs';
import parse from './parsers/index.js';

const isObject = (value) => (typeof value === 'object' && !Array.isArray(value) && value !== null);

const isRelativePath = (filepath) => filepath[0] === '/';

const getAbsolutePath = (filepath) => [process.cwd(), filepath].join('/');

const isExistFile = (filepath) => fs.existsSync(filepath);

const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf-8' });

const getExtensionFile = (filepath) => path.extname(filepath).slice(1);

const getContentFile = (filepath) => {
  const fullFilepath = isRelativePath(filepath) ? filepath : getAbsolutePath(filepath);
  const content = isExistFile(fullFilepath) ? readFile(fullFilepath) : undefined;
  return content ? parse(content, getExtensionFile(filepath)) : content;
};

export { isObject, getContentFile };
