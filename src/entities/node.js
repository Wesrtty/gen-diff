export const makeNodeInternal = (name, status, children) => ({ name, status, children });

export const makeNodeLeaf = (name, status, oldValue, newValue) => ({
  name, status, oldValue, newValue,
});

export const makeNode = (name, status, value) => ({ name, status, value });

export const getName = (node) => node.name;

export const getChildren = (node) => node.children;

export const getStatus = (node) => node.status;

export const getValue = (node) => node.value;

export const getOldValue = (node) => node.oldValue;

export const getNewValue = (node) => node.newValue;
