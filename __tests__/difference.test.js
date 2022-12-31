import {
  describe, beforeAll, test, expect,
} from '@jest/globals';
import difference from '../src/difference.js';
import { findFilePathByName, getContensDir, getContentFileInJsonFormat } from '../src/utils.js';

const getContentFile = (tree, filename) => {
  const [filepath] = findFilePathByName(tree, filename);
  return getContentFileInJsonFormat(filepath);
};

describe('difference', () => {
  let tree;

  beforeAll(() => {
    tree = getContensDir(process.cwd());
  });

  test('get difference between files', () => {
    const content1 = getContentFile(tree, 'file1.json');
    const content2 = getContentFile(tree, 'file2.json');

    const diff = difference(content1, content2);

    expect(diff).toEqual([
      { key: 'follow', sign: '-', value: false },
      { key: 'host', sign: ' ', value: 'hexlet.io' },
      { key: 'proxy', sign: '-', value: '123.234.53.22' },
      { key: 'timeout', sign: '-', value: 50 },
      { key: 'timeout', sign: '+', value: 20 },
      { key: 'verbose', sign: '+', value: true },
    ]);
  });

  test('get difference between objects', () => {
    const content = getContentFile(tree, 'file1.json');

    const diff = difference(content, {});

    expect(diff).toEqual([
      { key: 'follow', sign: '-', value: false },
      { key: 'host', sign: '-', value: 'hexlet.io' },
      { key: 'proxy', sign: '-', value: '123.234.53.22' },
      { key: 'timeout', sign: '-', value: 50 },
    ]);
  });

  test('get difference between objects', () => {
    const content = getContentFile(tree, 'file2.json');

    const diff = difference({}, content);

    expect(diff).toEqual([
      { key: 'host', sign: '+', value: 'hexlet.io' },
      { key: 'timeout', sign: '+', value: 20 },
      { key: 'verbose', sign: '+', value: true },
    ]);
  });

  test('get difference empty objects', () => {
    const diff = difference({}, {});
    expect(diff).toEqual([]);
  });
});
