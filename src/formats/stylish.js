import DiffType from '../diffType.js';
import stringify from '../helpers/stringify.js';
import getIndentMarker from '../helpers/getIndentMarker.js';

const DiffMarker = {
  [DiffType.EQUAL]: ' ',
  [DiffType.REMOVED]: '-',
  [DiffType.ADDED]: '+',
};

const StylishAction = {
  [DiffType.EQUAL]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.oldValue, n.indent, n.basicIndent)}`,
  [DiffType.REMOVED]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.oldValue, n.indent, n.basicIndent)}`,
  [DiffType.ADDED]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.newValue, n.indent, n.basicIndent)}`,
  [DiffType.NESTED]: (n, build) => `${n.indentMarker}${n.key}: {\n${build(n.children)}\n${n.indent}}`,
};

export default (diffs, indentChar = ' ', indentCount = 4) => {
  const basicIndent = indentChar.repeat(indentCount);

  const normalizer = (basicDiffs, indent) => basicDiffs.map((node) => {
    if (node.type === DiffType.NESTED) {
      return {
        ...node,
        indent,
        indentMarker: getIndentMarker(indent, DiffMarker[DiffType.EQUAL]),
        children: normalizer(node.children, indent.concat(basicIndent)),
      };
    }
    if (node.type === DiffType.UPDATED) {
      return [
        {
          ...node,
          indent,
          basicIndent,
          type: DiffType.REMOVED,
          indentMarker: getIndentMarker(indent, DiffMarker[DiffType.REMOVED]),
        },
        {
          ...node,
          indent,
          basicIndent,
          type: DiffType.ADDED,
          indentMarker: getIndentMarker(indent, DiffMarker[DiffType.ADDED]),
        },
      ];
    }
    return {
      ...node,
      indent,
      basicIndent,
      indentMarker: getIndentMarker(indent, DiffMarker[node.type]),
    };
  }).flat();

  const stringifyDiffs = (normalizedDiffs) => normalizedDiffs.map((node) => StylishAction[node.type](node, stringifyDiffs)).join('\n');

  return `{\n${stringifyDiffs(normalizer(diffs, basicIndent))}\n}`;
};
