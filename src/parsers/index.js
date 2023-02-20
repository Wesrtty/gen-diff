import parseJson from './json.js';
import parseYaml from './yaml.js';

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
};

const parse = (data, format) => {
  if (!parsers[format]) {
    throw new Error(`Unknown format: ${format}.`);
  }

  return parsers[format](data);
};

export default parse;
