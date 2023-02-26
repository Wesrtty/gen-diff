import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import compareObjects from '../src/compareObjects';

const readFile = (fileName) => {
  const fullPath = path.resolve(process.cwd(), '__fixtures__', fileName);
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
};

describe('build difference between objects', () => {
  test('should return difference between empty objects', () => {
    const actualValue = compareObjects({}, {});
    expect(actualValue).toHaveLength(0);
  });

  test('should return difference between identical objects', () => {
    const expectedValue = [
      { name: 'a', status: 'unchanged', value: 1 },
      { name: 'b', status: 'unchanged', value: 1 },
    ];
    const obj = { a: 1, b: 1 };
    const actualValue = compareObjects(obj, obj);
    expect(actualValue).toMatchObject(expectedValue);
  });

  test('should return difference between deep objects', () => {
    const pathToFile = 'results/differenceBetweenFiles.json';
    const expectedValue = JSON.parse(readFile(pathToFile));

    const obj1 = JSON.parse(readFile('file1.json'));
    const obj2 = JSON.parse(readFile('file2.json'));

    const actualValue = compareObjects(obj1, obj2);
    expect(actualValue).toMatchObject(expectedValue);
  });
});
