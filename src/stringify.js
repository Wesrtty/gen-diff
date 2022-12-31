const buildLine = (indent, sign, key, value) => `${indent}${sign} ${key}: ${value}`;

export default (array, replacer, spacesCount) => {
  const indent = replacer.repeat(spacesCount);
  const lines = array
    .map(({ key, value, sign }) => buildLine(indent, sign, key, value))
    .join('\n');
  return ['{', lines, '}'].join('\n');
};
