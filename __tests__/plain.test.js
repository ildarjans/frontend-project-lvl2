import { describe, expect, it } from '@jest/globals';
import plain from '../src/formats/plain.js';

describe('Check "plain" formatter return correct string', () => {
  it('Case 1. plain object.', () => {
    const diffs = [
      { key: 'address', oldValue: 'NY', type: 'REMOVED' },
      { key: 'age', oldValue: '33', type: 'REMOVED' },
      { key: 'alcohol', newValue: 'free', type: 'ADDED' },
      { key: 'cakes', newValue: false, type: 'ADDED' },
      { key: 'human', oldValue: true, type: 'REMOVED' },
      { key: 'married', oldValue: false, type: 'REMOVED' },
      { key: 'name', oldValue: 'Ivan', type: 'REMOVED' },
      { key: 'tobacco', newValue: 1, type: 'ADDED' },
      { key: 'vegetables', newValue: 'a lot', type: 'ADDED' },
    ];
    const expected = '\n'
      + 'Property \'address\' was removed'
      + '\nProperty \'age\' was removed'
      + '\nProperty \'alcohol\' was added with value: \'free\''
      + '\nProperty \'cakes\' was added with value: false'
      + '\nProperty \'human\' was removed'
      + '\nProperty \'married\' was removed'
      + '\nProperty \'name\' was removed'
      + '\nProperty \'tobacco\' was added with value: 1'
      + '\nProperty \'vegetables\' was added with value: \'a lot\''
      + '\n';
    expect(plain(diffs)).toEqual(expected);
  });
  it('Case 2. nested object.', () => {
    const diffs = [
      {
        key: 'common',
        children: [
          { key: 'follow', newValue: false, type: 'ADDED' },
          { key: 'setting1', oldValue: 'Value 1', type: 'EQUAL' },
          { key: 'setting2', oldValue: '200', type: 'REMOVED' },
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
          abc: '12345', deep: { id: '45' },
        },
        type: 'REMOVED',
      },
      {
        key: 'group3',
        newValue: {
          deep: { id: { number: '45' } },
          fee: '100500',
        },
        type: 'ADDED',
      },
    ];
    const expected = '\n'
    + 'Property \'common.follow\' was added with value: false'
    + '\nProperty \'common.setting2\' was removed'
    + '\nProperty \'common.setting3\' was updated. From true to null'
    + '\nProperty \'common.setting4\' was added with value: \'blah blah\''
    + '\nProperty \'common.setting5\' was added with value: [complex value]'
    + '\nProperty \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\''
    + '\nProperty \'common.setting6.ops\' was added with value: \'vops\''
    + '\nProperty \'group1.baz\' was updated. From \'bas\' to \'bars\''
    + '\nProperty \'group1.nest\' was updated. From [complex value] to \'str\''
    + '\nProperty \'group2\' was removed'
    + '\nProperty \'group3\' was added with value: [complex value]'
    + '\n';

    expect(plain(diffs)).toEqual(expected);
  });
});
