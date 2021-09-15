import _ from 'lodash';
import { DiffType } from '../const.js';

const getFormattedValue = (value) => {
  if (_.isObject(value)) { return '[complex value]'; }
  if (_.isString(value)) { return `'${value}'`; }
  return value;
};

const PlainAction = {
  [DiffType.EQUAL]: () => [],
  [DiffType.ADDED]: (node, paths) => `Property '${paths.join('.')}' was added with value: ${getFormattedValue(node.newValue)}`,
  [DiffType.REMOVED]: (node, paths) => `Property '${paths.join('.')}' was removed`,
  [DiffType.UPDATED]: (node, paths) => `Property '${paths.join('.')}' was updated. From ${getFormattedValue(node.oldValue)} to ${getFormattedValue(node.newValue)}`,
  [DiffType.NESTED]: (node, paths, build) => build(node.children, paths),
};

export default (diffs) => {
  const iter = (basicDiffs, paths = []) => basicDiffs
    .flatMap((diff) => PlainAction[diff.type](diff, [...paths, diff.key], iter));

  return `\n${iter(diffs).join('\n')}\n`;
};
