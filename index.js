import parser from './src/parser.js';
import Formats from './src/formats/index.js';
import buildDiff from './src/buildDiff.js';

export default (filepath1, filepath2, format) => {
  const target = parser(filepath1);
  const source = parser(filepath2);
  return Formats[format](buildDiff(target, source));
};
