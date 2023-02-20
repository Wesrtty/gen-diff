import { describe, expect, test } from "@jest/globals";
import parse from "../src/parsers/index.js";
import fs from 'fs';
import path from 'path';

const readFile = (fileName) => {
    const filePath = path.join(path.resolve(), '__fixtures__', fileName);
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
};

const convertToJSON = (content) => {
    return JSON.parse(JSON.stringify(content));
};

const isJSON = (content) => {
    try {
        convertToJSON(content);
    } catch {
        return false;
    }

    return true;
};

describe('parsers', () => {
    test.each([
        { filePath: 'file1.json', format: 'json' },
        { filePath: 'file2.yaml', format: 'yaml' },
        { filePath: 'file2.yaml', format: 'yml' },
    ])
    ('should parse to json from $format', ({filePath, format}) => {
        const content = parse(readFile(filePath), format);
        
        expect(isJSON(content)).toBeTruthy();
        expect(content).toEqual(convertToJSON(content));
    });

    test.each([ 'json', 'yaml', 'yml' ])
    ('should parse empty to json from %s', (format) => {
        const content = parse(null, format);
        
        expect(isJSON(content)).toBeTruthy();
        expect(content).toEqual(convertToJSON(content));
    });

    test('should throw error when parse unknown format', () => {
        expect(() => parse('{}', 'txt')).toThrow();
    });
});