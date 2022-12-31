import {
  describe, beforeAll, test, expect,
} from '@jest/globals';
import path from 'path';
import { getContensDir, findFilePathByName } from '../src/utils.js';

describe('findFilePathByName', () => {
  let tree;
  const currentDir = path.resolve();

  beforeAll(() => {
    tree = getContensDir(currentDir);
  });

  test('get file path by name', () => {
    const filename = 'file1.json';
    const [filepath] = findFilePathByName(tree, filename);
    expect(filepath).toBe(path.join(currentDir, '__fixtures__', filename));
  });

  test('get non existing file path by name', () => {
    const filepath = findFilePathByName(tree, 'file_not_found.json');
    expect(filepath).toEqual([]);
    expect(filepath).toHaveLength(0);
  });

  test('get file path by directory name', () => {
    const filepath = findFilePathByName(tree, '__fixtures__');
    expect(filepath).toEqual([]);
    expect(filepath).toHaveLength(0);
  });
});
