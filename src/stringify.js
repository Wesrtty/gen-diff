const stringify = (value, replacer = ' ', spacesCount = 2) => {
  const indent = replacer.repeat(spacesCount);
  const lines = value.map(({ sign, key, value }) => {
    return `${indent}${sign} ${key}: ${value}`;
  });
  return [ '{', ...lines, '}' ].join('\n');
};

export default stringify;
