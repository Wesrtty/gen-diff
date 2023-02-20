import { describe, test, expect } from '@jest/globals';
import path from 'path';
import { getContentFile } from '../src/utils.js';

describe('utils', () => {
  test('should return file content', () => {
    expect(getContentFile('__fixtures__/file1.json')).not.toBe('');
  });

  test('should return file content when path absolute', () => {
    const filePath = path.join(process.cwd(), '__fixtures__/file1.json');
    expect(getContentFile(filePath)).not.toBe('');
  });

  test('should throw error when file not found', () => {
    expect(() => getContentFile('__fixtures__/file_name_random_12345.json')).toThrow();
  });
});
