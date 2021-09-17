import _ from 'lodash';
import DiffType from './diffType.js';

const mapper = [
  {
    check: (before, after) => _.isObject(before) && _.isObject(after),
    status: (before, after, cb) => ({ children: cb(before, after), type: DiffType.NESTED }),
  },
  {
    check: (before, after) => _.isUndefined(before) && !_.isUndefined(after),
    status: (before, after) => ({ newValue: after, type: DiffType.ADDED }),
  },
  {
    check: (before, after) => !_.isUndefined(before) && _.isUndefined(after),
    status: (before) => ({ oldValue: before, type: DiffType.REMOVED }),
  },
  {
    check: (before, after) => !_.isEqual(before, after),
    status: (before, after) => ({ oldValue: before, newValue: after, type: DiffType.UPDATED }),
  },
  {
    check: (before, after) => _.isEqual(before, after),
    status: (before) => ({ oldValue: before, type: DiffType.EQUAL }),
  },
];

export default (target, source) => {
  const iter = (obj1, obj2) => {
    const uniqKeys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]).sort();
    return uniqKeys.map((key) => {
      const before = obj1[key];
      const after = obj2[key];

      const { status } = mapper.find(({ check }) => check(before, after));

      return { key, ...status(before, after, iter) };
    });
  };

  return iter(target, source);
};
