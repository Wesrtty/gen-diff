import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import stringify from '../src/stringify';

describe('stringify', () => {
  test('stringify 1', () => {
    const data = [
      { key: 'follow', sign: '-', value: false },
      { key: 'host', sign: ' ', value: 'hexlet.io' },
      { key: 'proxy', sign: '-', value: '123.234.53.22' },
      { key: 'timeout', sign: '-', value: 50 },
      { key: 'timeout', sign: '+', value: 20 },
      { key: 'verbose', sign: '+', value: true },
    ];
    const filepath = path.join(path.resolve(), '__fixtures__', 'testResult1.txt');
    const result = fs.readFileSync(filepath, { encoding: 'utf-8' });

    expect(stringify(data, ' ', 2)).toBe(result);
  });
});
