export const makeDirectory = (name, children, path) => ({
  name, type: 'directory', children, path,
});

export const getChildren = (directory) => directory.children;
