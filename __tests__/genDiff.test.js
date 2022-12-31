import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (filename) => {
  const filepath = path.join(path.resolve(), '__fixtures__', filename);
  return fs.readFileSync(filepath, { encoding: 'utf-8' });
};

describe('genDiff', () => {
  test.each([
    ['fileWrong.txt', 'fileWrong.txt'],
    ['fileWrong.txt', 'file1.json'],
    ['file1.json', 'fileWrong.txt'],
    [' ', ''],
    [null, undefined],
    [undefined, null],
    [1, true],
  ])('get difference between files wrong format', (filename1, filename2) => {
    const error = genDiff(filename1, filename2);

    expect(error).toBe('File is not valid.');
  });

  test.each([
    ['file_not_found.json', 'file_not_found.json'],
    ['file1.json', 'file_not_found.json'],
    ['file_not_found.json', 'file1.json'],
  ])('get difference between files, if file doesn\'t exist', (filename1, filename2) => {
    const error = genDiff(filename1, filename2);

    expect(error).toBe('File not found.');
  });

  test('get difference between files', () => {
    const diff = genDiff('file1.json', 'file2.json');
    const result = readFile('testResult1.txt');
    expect(diff).toBe(result);
  });
});
