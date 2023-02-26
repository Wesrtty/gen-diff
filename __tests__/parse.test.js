import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import parse from '../src/parsers/index.js';

const readFile = (fileName) => {
  const fullPath = path.resolve(process.cwd(), '__fixtures__', fileName);
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
};

const parseToJson = (data) => JSON.parse(JSON.stringify(data));

const isJSON = (data) => {
  try {
    parseToJson(data);
  } catch {
    return false;
  }

  return true;
};

describe('parsers', () => {
  test.each([
    { pathToFile: 'file1.json', format: 'json' },
    { pathToFile: 'file2.yaml', format: 'yaml' },
    { pathToFile: 'file2.yaml', format: 'yml' },
  ])('should parse to json from $format', ({ pathToFile, format }) => {
    const content = parse(readFile(pathToFile), format);

    expect(isJSON(content)).toBeTruthy();
    expect(content).toEqual(parseToJson(content));
  });

  test.each(['json', 'yaml', 'yml'])('should parse empty to json from %s', (format) => {
    const content = parse(null, format);

    expect(isJSON(content)).toBeTruthy();
    expect(content).toEqual(parseToJson(content));
  });

  test('should throw error when parse unknown format', () => {
    expect(() => parse('{}', 'txt')).toThrow();
  });
});
