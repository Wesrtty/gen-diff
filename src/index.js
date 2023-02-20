import { getContentFile } from './utils.js';
import buildDiff from './buildDiff.js';
import buildReport from './formatters/index.js';

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  try {
    const content1 = getContentFile(filepath1);
    const content2 = getContentFile(filepath2);

    const diff = buildDiff(content1, content2);
    return buildReport(diff, outputFormat);
  } catch (e) {
    throw new Error(e);
  }
};
