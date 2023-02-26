import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (fileName) => {
  const fullPath = path.resolve(process.cwd(), '__fixtures__', fileName);
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
};

const firstLetterToUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const pathToFileJson1 = '__fixtures__/file1.json';
const pathToFileJson2 = '__fixtures__/file2.json';
const pathToFileYaml = '__fixtures__/file2.yaml';

const formats = ['stylish', 'plain', 'json'];

describe('genDiff', () => {
  test('should return difference between json files in default format', () => {
    const expectedValue = readFile('./results/reportStylish.txt');
    const actualValue = genDiff(pathToFileJson1, pathToFileJson2);
    expect(actualValue).toEqual(expectedValue);
  });

  test.each(formats)('should return difference between json and yaml files in %s format', (format) => {
    const expectedValue = readFile(`./results/report${firstLetterToUppercase(format)}.txt`);
    const actualValue = genDiff(pathToFileJson1, pathToFileYaml, format);

    expect(actualValue).toEqual(expectedValue);
  });

  test('should throw error when file not found', () => {
    expect(() => genDiff(pathToFileJson1, '12345_name.json')).toThrow();
  });
});
