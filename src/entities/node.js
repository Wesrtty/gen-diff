export const makeNodeInternal = (name, status, children) => ({ name, status, children });

export const makeNodeLeaf = (name, status, oldValue, newValue) => ({
  name, status, oldValue, newValue,
});

export const makeNode = (name, status, value) => ({ name, status, value });
