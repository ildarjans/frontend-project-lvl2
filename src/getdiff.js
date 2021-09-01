import _ from 'lodash';

export default (obj, source) => {
  const allKeys = _.uniq([..._.keys(obj), ..._.keys(source)]).sort();
  const allDiffs = allKeys.reduce((acc, k) => {
    const hasKeyInObj = _.has(obj, k);
    const hasKeyInSrc = _.has(source, k);

    if (hasKeyInObj && hasKeyInSrc && obj[k] === source[k]) {
      acc.push(`  ${k}: ${obj[k]}`);
    } else if (hasKeyInObj && hasKeyInSrc && obj[k] !== source[k]) {
      acc.push(`- ${k}: ${obj[k]}`);
      acc.push(`+ ${k}: ${source[k]}`);
    } else if (hasKeyInObj && !hasKeyInSrc) {
      acc.push(`- ${k}: ${obj[k]}`);
    } else if (!hasKeyInObj && hasKeyInSrc) {
      acc.push(`+ ${k}: ${source[k]}`);
    }

    return acc;
  }, []);
  return `{\n ${allDiffs.join('\n ')}\n}`;
};
