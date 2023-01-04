import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf-8' });

describe('genDiff', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.yaml';

  test.each([
    [undefined, 'stylishOutput.txt'],
    ['stylish', 'stylishOutput.txt'],
    ['plain', 'plainOutput.txt'],
  ])('get difference between files in %s format', (format, output) => {
    const diff = genDiff(filepath1, filepath2, format);
    const expectedResult = readFile(output);

    expect(diff).toEqual(expectedResult);
  });

  test('get difference between files in json format', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    const content = readFile('jsonOutput.json');
    const expectedResult = JSON.parse(content);

    expect(diff).toEqual(expectedResult);
  });

  test.each([
    ['file1.json', '__fixtures__/file2.yaml'],
    ['__fixtures__/file1.json', 'file2.yaml'],
    ['__fixtures__/file1.json', '__fixtures/file2.yaml'],
    ['__fixtures__/file1.json', '__fixtures__/file2.txt'],
  ])('Get error - file not found', (filename1, filename2) => {
    const errorMessage = genDiff(filename1, filename2);

    expect(errorMessage).toBe('File not found.');
  });

  test.each(['txt', 'jsonf', 'yoml'])('get error - output format not supported', (format) => {
    expect(() => genDiff(filepath1, filepath2, format)).toThrow(`Unknown format: ${format}.`);
  });
});
