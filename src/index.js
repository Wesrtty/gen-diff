import { getContentFile } from './utils.js';
import buildDiff from './buildDiff.js';
import buildOuput from './formatters/index.js';

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  try {
    const content1 = getContentFile(filepath1);
    const content2 = getContentFile(filepath2);

    if (!content1 || !content2) {
      return 'File not found.';
    }

    const diff = buildDiff(content1, content2);
    return buildOuput(diff, outputFormat);
  } catch (e) {
    throw new Error(e);
  }
};
