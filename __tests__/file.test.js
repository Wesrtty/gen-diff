import { describe, expect, test } from "@jest/globals";
import { makeFile, getContent, getPath, getExtension } from '../src/entities/file.js';
import { extname } from 'path';

describe('File', () => {
    const fileInfo = {
        content: 'text',
        path: '__fixtures__/file1.json',
    };

    test('makeFile', () => {
        const file = makeFile(fileInfo.content, fileInfo.path);

        expect(file).toEqual({ ...fileInfo, extname: extname(fileInfo.path).slice(1) });
    });

    test('getContent', () => {
        const file = makeFile(fileInfo.content, fileInfo.path);
        expect(getContent(file)).toBe(fileInfo.content);
    });

    test('getPath', () => {
        const file = makeFile(fileInfo.content, fileInfo.path);
        expect(getPath(file)).toBe(fileInfo.path);
    });

    test('getExtension', () => {
        const file = makeFile(fileInfo.content, fileInfo.path);
        expect(getExtension(file)).toBe(extname(fileInfo.path).slice(1));
    });
});