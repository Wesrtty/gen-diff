import {
  beforeAll, describe, expect, test,
} from '@jest/globals';
import fs from 'fs';
import path from 'path';
import buildReport from '../src/formatters/index.js';
import { makeNode } from '../src/entities/node.js';

const formats = [
  { format: 'stylish', expected: '{\n}' },
  { format: 'plain', expected: '' },
  { format: 'json', expected: '[]' },
];

const readFile = (fileName) => {
  const filePath = path.join(path.resolve(), '__fixtures__', fileName);
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
};

const firstLetterToUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

describe('build report', () => {
  let obj;

  beforeAll(() => {
    obj = JSON.parse(readFile('./results/differenceBetweenFiles.json'));
  });

  test.each(formats)('should return report in $format format', ({ format }) => {
    const expected = readFile(`./results/report${firstLetterToUppercase(format)}.txt`);

    const report = buildReport(obj, format);
    expect(report).toBe(expected);
  });

  test.each(formats)('should return report from empty data in $format format', ({ format, expected }) => {
    expect(buildReport([], format)).toBe(expected);
  });

  test('should throw error when build report in unknown format', () => {
    expect(() => buildReport({}, 'randon_name')).toThrow();
  });

  test.each(formats.filter(({ format }) => format !== 'json'))('should throw error when build report if node status is unknown', ({ format }) => {
    expect(() => buildReport([makeNode('key', 'random_1234', 'value')], format)).toThrow();
  });
});
