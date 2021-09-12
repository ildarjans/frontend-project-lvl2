import _ from 'lodash';

export default (obj, commonIndent = ' ', propIndent = commonIndent) => {
  const stringifyObj = (o, i) => {
    const entries = _.entries(o)
      .map(([key, value]) => (
        _.isObject(value) ? `\n${i}${key}: ${stringifyObj(value, i.concat(propIndent))}` : `\n${i}${key}: ${value}`
      ));
    return `{${entries.join('')}\n${i.replace(propIndent, '')}}`;
  };
  return _.isObject(obj) ? stringifyObj(obj, commonIndent.concat(propIndent)) : `${obj}`;
};
