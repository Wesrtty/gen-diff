import fs from 'fs';
import path from 'path';
import * as file from '../entities/file.js';
import * as directory from '../entities/directory.js';

const getContensDir = (dirpath) => {
  const stat = fs.statSync(dirpath);
  const name = path.basename(dirpath);

  if (stat.isFile()) {
    return file.makeFile(name, dirpath);
  }

  const children = fs.readdirSync(dirpath)
    .map((name) => path.join(dirpath, name))
    .map((path) => getContensDir(path));

  return directory.makeDirectory(name, children, dirpath);
};

const findFilePathByName = (filename) => {
  const iter = (node) => {
    if (file.isFile(node)) {
      return file.getName(node) === filename ? file.getPath(node) : [];
    }

    return directory
      .getChildren(node)
      .flatMap(iter);
  };
  const contentsDir = getContensDir(path.resolve());
  return iter(contentsDir)[0];
};

export const toJson = (str) => JSON.parse(str);

export const readFile = (filename) => {
  const filepath = fs.existsSync(filename) ? filename : findFilePathByName(filename);
  return fs.readFileSync(filepath, { encoding: 'utf-8' });
};
