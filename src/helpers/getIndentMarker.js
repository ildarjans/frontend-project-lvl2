export default (indent, marker, endPlace = 2) => {
  const len = indent.length;
  return indent.slice(0, len - endPlace) + marker + indent.slice(-1);
};
