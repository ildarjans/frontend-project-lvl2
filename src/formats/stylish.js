import { DiffType } from '../const.js';
import stringify from '../helpers/stringify.js';
import getIndentMarker from '../helpers/getIndentMarker.js';

const DiffMarker = {
  SAME: ' ',
  MISSED: '-',
  NEW: '+',
  EMPTY: '   ',
};

const StylishAction = {
  [DiffType.SAME]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.oldValue, n.indent, n.basicIndent)}`,
  [DiffType.MISSED]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.oldValue, n.indent, n.basicIndent)}`,
  [DiffType.NEW]: (n) => `${n.indentMarker}${n.key}: ${stringify(n.newValue, n.indent, n.basicIndent)}`,
  [DiffType.NESTED]: (n, build) => `${n.indentMarker}${n.key}: {\n${build(n.children)}\n${n.indent}}`,
};

export default (diffs, indentChar = ' ', indentCount = 4) => {
  const basicIndent = indentChar.repeat(indentCount);

  const normalizer = (basicDiffs, indent) => basicDiffs.map((node) => {
    if (node.type === DiffType.NESTED) {
      return {
        ...node,
        indent,
        indentMarker: getIndentMarker(indent, DiffMarker.SAME),
        children: normalizer(node.children, indent.concat(basicIndent)),
      };
    }
    if (node.type === DiffType.UPDATED) {
      return [
        {
          ...node,
          indent,
          basicIndent,
          type: DiffType.MISSED,
          indentMarker: getIndentMarker(indent, DiffMarker.MISSED),
        },
        {
          ...node,
          indent,
          basicIndent,
          type: DiffType.NEW,
          indentMarker: getIndentMarker(indent, DiffMarker.NEW),
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
