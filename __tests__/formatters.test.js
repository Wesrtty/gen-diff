import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import buildOutputFormat from '../src/formatters/index.js';

const formats = [
  { format: 'stylish', expectedValue: '{\n}' },
  { format: 'plain', expectedValue: '' },
  { format: 'json', expectedValue: '[]' },
];

const readFile = (fileName) => {
  const fullPath = path.resolve(process.cwd(), '__fixtures__', fileName);
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
};

const firstLetterToUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

describe('build report', () => {
  const pathToFile = './results/differenceBetweenFiles.json';
  const diffObjects = JSON.parse(readFile(pathToFile));

  test.each(formats)('should return report in $format format', ({ format }) => {
    const fileName = firstLetterToUppercase(format);
    const expectedValue = readFile(`./results/report${fileName}.txt`);

    const actualValue = buildOutputFormat(diffObjects, format);
    expect(actualValue).toBe(expectedValue);
  });

  test.each(formats)('should return report from empty data in $format format', ({ format, expectedValue }) => {
    const actualValue = buildOutputFormat([], format);
    expect(actualValue).toBe(expectedValue);
  });

  test('should throw error when build report in unknown format', () => {
    expect(() => buildOutputFormat({}, 'randon_name')).toThrow();
  });

  test.each(formats.filter(({ format }) => format !== 'json'))('should throw error when build report if node status is unknown', ({ format }) => {
    const diffObjectsError = [
      { key: 'key', status: 'random_1234', value: 'value' },
    ];
    expect(() => buildOutputFormat(diffObjectsError, format)).toThrow();
  });
});
