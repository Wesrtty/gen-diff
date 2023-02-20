import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (fileName) => {
  const filePath = path.join(path.resolve(), '__fixtures__', fileName);
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
};

const firstLetterToUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const jsonFilePath1 = '__fixtures__/file1.json';
const jsonFilePath2 = '__fixtures__/file2.json';
const yamlFilePath = '__fixtures__/file2.yaml';

const formats = [ 'stylish', 'plain', 'json' ];

describe('genDiff', () => {
  test('should return difference between json files in default format', () => {
    const report = genDiff(jsonFilePath1, jsonFilePath2);

    expect(report).toEqual(readFile('./results/reportStylish.txt'));
  });

  test.each(formats)
  ('should return difference between json and yaml files in %s format', (format) => {
    const report = genDiff(jsonFilePath1, yamlFilePath, format);

    expect(report).toEqual(readFile(`./results/report${firstLetterToUppercase(format)}.txt`));
  });

  test('should throw error when file not found', () => {
    expect(() => genDiff(jsonFilePath1, '12345_name.json')).toThrow();
  });
});
