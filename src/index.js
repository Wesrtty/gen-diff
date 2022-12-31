import path from 'path';
import {
  getContentFileInJsonFormat, isValidFile, getContensDir, findFilePathByName,
} from './utils.js';
import difference from './difference.js';
import stringify from './stringify.js';

export default (filename1, filename2) => {
  if (!isValidFile(filename1) || !isValidFile(filename2)) {
    return 'File is not valid.';
  }

  const currentDir = path.resolve();
  const memo = getContensDir(currentDir);

  const [filepath1] = findFilePathByName(memo, filename1);
  const [filepath2] = findFilePathByName(memo, filename2);

  if (!filepath1 || !filepath2) {
    return 'File not found.';
  }

  const content1 = getContentFileInJsonFormat(filepath1);
  const content2 = getContentFileInJsonFormat(filepath2);

  const diff = difference(content1, content2);

  return stringify(diff, ' ', 2);
};
