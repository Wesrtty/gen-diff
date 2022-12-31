import fs from 'fs';
import path from 'path';
import * as file from './entities/file.js';
import * as directory from './entities/directory.js';

const isValidFile = (filename) => typeof filename === 'string'
    && ['.json'].includes(path.extname(filename));

const getContensDir = (dirpath) => {
  const stat = fs.statSync(dirpath);
  const name = path.basename(dirpath);

  if (stat.isFile()) {
    return file.makeFile(name, dirpath);
  }

  const children = fs.readdirSync(dirpath)
    .map((documentName) => path.join(dirpath, documentName))
    .map((documentPath) => getContensDir(documentPath));

  return directory.makeDirectory(name, children, dirpath);
};

const findFilePathByName = (tree, filename) => {
  const iter = (node) => {
    if (file.isFile(node)) {
      return file.getName(node) === filename ? file.getPath(node) : [];
    }

    return directory
      .getChildren(node)
      .flatMap(iter);
  };
  return iter(tree);
};

const readFile = (filepath) => fs.readFileSync(filepath, { encoding: 'utf-8' });

const getContentFileInJsonFormat = (filepath) => {
  const content = readFile(filepath) || '{}';
  return JSON.parse(content);
};

export {
  isValidFile,
  getContensDir,
  findFilePathByName,
  getContentFileInJsonFormat,
};
