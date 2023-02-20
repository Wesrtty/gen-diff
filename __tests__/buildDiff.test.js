import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import buildDiff from '../src/buildDiff.js';

const readFile = (fileName) => {
  const filePath = path.join(path.resolve(), '__fixtures__', fileName);
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
};

describe('build difference between objects', () => {
  test('should return difference between empty objects', () => {
    const diff = buildDiff({}, {});

    expect(diff).toMatchObject([]);
    expect(diff).toHaveLength(0);
  });

  test('should return difference between identical objects', () => {
    const expected = [
      { name: 'a', status: 'unchanged', value: 1 },
      { name: 'b', status: 'unchanged', value: 1 },
    ];
    const obj = { a: 1, b: 1 };
    expect(buildDiff(obj, obj)).toMatchObject(expected);
  });

  test('should return difference between deep objects', () => {
    const expected = JSON.parse(readFile('results/differenceBetweenFiles.json'));
    const obj1 = JSON.parse(readFile('file1.json'));
    const obj2 = JSON.parse(readFile('file2.json'));

    const diff = buildDiff(obj1, obj2);

    expect(diff).toMatchObject(expected);
  });
});
