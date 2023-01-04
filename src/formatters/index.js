import buildStylish from './stylish.js';
import buildPlain from './plain.js';
import buildJson from './json.js';

const formatters = {
  stylish: buildStylish,
  plain: buildPlain,
  json: buildJson,
};

const buildOuput = (data, format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}.`);
  }

  return formatters[format](data);
};

export default buildOuput;
