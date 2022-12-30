import path from 'path';
import { readFile } from '../src/fs/fileSystem.js';
import genDiff from '../src/index.js';

const getTestResult = (filename) => readFile(path.join(path.resolve(), '__fixtures__', filename));

describe('genDiff', () => {
  test('test 1', () => {
    const result = getTestResult('testResult1.txt');
    const diff = genDiff('file1.json', 'file2.json');

    expect(diff).toBe(result);
  });

  test('test 2', () => {
    const result = getTestResult('testResult2.txt');
    const diff = genDiff('file1.json', 'file3.json');

    expect(diff).toBe(result);
  });

  test('test 3', () => {
    const result = getTestResult('testResult3.txt');
    const diff = genDiff('file2.json', 'file1.json');

    expect(diff).toBe(result);
  });
});
