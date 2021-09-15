import { describe, expect, it } from '@jest/globals';
import stylish from '../src/formats/stylish.js';

describe('Check "stylish" formatter return correct string', () => {
  it('Case 1. plain object.', () => {
    const diffs = [
      { key: 'address', oldValue: 'NY', type: 'REMOVED' },
      { key: 'age', oldValue: '33', type: 'REMOVED' },
      { key: 'alcohol', newValue: 'free', type: 'ADDED' },
      { key: 'cakes', newValue: 'false', type: 'ADDED' },
      { key: 'human', oldValue: 'true', type: 'REMOVED' },
      { key: 'married', oldValue: 'false', type: 'REMOVED' },
      { key: 'name', oldValue: 'Ivan', type: 'REMOVED' },
      { key: 'tobacco', newValue: '1', type: 'ADDED' },
      { key: 'vegetables', newValue: 'a lot', type: 'ADDED' },
    ];
    const expected = '{\n '
      + ' - address: NY\n '
      + ' - age: 33\n '
      + ' + alcohol: free\n '
      + ' + cakes: false\n '
      + ' - human: true\n '
      + ' - married: false\n '
      + ' - name: Ivan\n '
      + ' + tobacco: 1\n '
      + ' + vegetables: a lot'
      + '\n}';
    expect(stylish(diffs)).toEqual(expected);
  });
  it('Case 2. nested object.', () => {
    const diffs = [
      {
        key: 'common',
        children: [
          { key: 'follow', newValue: false, type: 'ADDED' },
          { key: 'setting1', oldValue: 'Value 1', type: 'EQUAL' },
          { key: 'setting2', oldValue: 200, type: 'REMOVED' },
          {
            key: 'setting3', oldValue: true, newValue: null, type: 'UPDATED',
          },
          { key: 'setting4', newValue: 'blah blah', type: 'ADDED' },
          { key: 'setting5', newValue: { key5: 'value5' }, type: 'ADDED' },
          {
            key: 'setting6',
            children: [
              {
                key: 'doge',
                children: [
                  {
                    key: 'wow', oldValue: '', newValue: 'so much', type: 'UPDATED',
                  },
                ],
                type: 'NESTED',
              },
              { key: 'key', oldValue: 'value', type: 'EQUAL' },
              { key: 'ops', newValue: 'vops', type: 'ADDED' },
            ],
            type: 'NESTED',
          },
        ],
        type: 'NESTED',
      },
      {
        key: 'group1',
        children: [
          {
            key: 'baz', oldValue: 'bas', newValue: 'bars', type: 'UPDATED',
          },
          { key: 'foo', oldValue: 'bar', type: 'EQUAL' },
          {
            key: 'nest',
            oldValue: { key: 'value' },
            newValue: 'str',
            type: 'UPDATED',
          },
        ],
        type: 'NESTED',
      },
      {
        key: 'group2',
        oldValue: {
          abc: 12345, deep: { id: 45 },
        },
        type: 'REMOVED',
      },
      {
        key: 'group3',
        newValue: {
          deep: { id: { number: 45 } },
          fee: 100500,
        },
        type: 'ADDED',
      },
    ];
    const expected = '{\n'
      + '    common: {\n'
      + '      + follow: false\n'
      + '        setting1: Value 1\n'
      + '      - setting2: 200\n'
      + '      - setting3: true\n'
      + '      + setting3: null\n'
      + '      + setting4: blah blah\n'
      + '      + setting5: {\n'
      + '            key5: value5\n'
      + '        }\n'
      + '        setting6: {\n'
      + '            doge: {\n'
      + '              - wow: \n'
      + '              + wow: so much\n'
      + '            }\n'
      + '            key: value\n'
      + '          + ops: vops\n'
      + '        }\n'
      + '    }\n'
      + '    group1: {\n'
      + '      - baz: bas\n'
      + '      + baz: bars\n'
      + '        foo: bar\n'
      + '      - nest: {\n'
      + '            key: value\n'
      + '        }\n'
      + '      + nest: str\n'
      + '    }\n'
      + '  - group2: {\n'
      + '        abc: 12345\n'
      + '        deep: {\n'
      + '            id: 45\n'
      + '        }\n'
      + '    }\n'
      + '  + group3: {\n'
      + '        deep: {\n'
      + '            id: {\n'
      + '                number: 45\n'
      + '            }\n'
      + '        }\n'
      + '        fee: 100500\n'
      + '    }\n'
      + '}';
    expect(stylish(diffs)).toEqual(expected);
  });
});
