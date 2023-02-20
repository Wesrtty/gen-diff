import parseJson from './json.js';
import parseYaml from './yaml.js';

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
};

export default (data, format) => {
  if (!parsers[format]) {
    throw new Error(`Unknown format: ${format}.`);
  }

  return parsers[format](data);
};
