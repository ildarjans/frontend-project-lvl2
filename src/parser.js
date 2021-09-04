import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const extensionParser = {
  json: (file) => JSON.parse(file),
  yaml: (file) => yaml.load(file),
  yml: (file) => yaml.load(file),
};

export default (filepath) => {
  const extension = path.extname(filepath).slice(1).toLowerCase();
  const fin = fs.readFileSync(filepath);
  return extensionParser[extension](fin);
};
