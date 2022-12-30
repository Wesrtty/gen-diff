export const makeFile = (name, path) => ({ name, type: 'file', path });

export const getName = (file) => file.name;

export const getType = (file) => file.type;

export const isFile = (file) => getType(file) === 'file';

export const getPath = (file) => file.path;
