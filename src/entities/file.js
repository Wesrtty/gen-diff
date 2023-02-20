import { extname } from 'path';

export const makeFile = (content, path) => ({ extname: extname(path).slice(1), content, path });

export const getExtension = (file) => file.extname;

export const getContent = (file) => file.content;

export const getPath = (file) => file.path;