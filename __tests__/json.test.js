import { describe, expect, it } from '@jest/globals';
import json from '../src/formats/json.js';

describe('Check "json" formatter return correct string', () => {
  it('Case 1. nested object.', () => {
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
    const expected = '['
      + '{"key":"common","children":['
      + '{"key":"follow","newValue":false,"type":"ADDED"},'
      + '{"key":"setting1","oldValue":"Value 1","type":"EQUAL"},'
      + '{"key":"setting2","oldValue":200,"type":"REMOVED"},'
      + '{"key":"setting3","oldValue":true,"newValue":null,"type":"UPDATED"},'
      + '{"key":"setting4","newValue":"blah blah","type":"ADDED"},'
      + '{"key":"setting5","newValue":{"key5":"value5"},"type":"ADDED"},'
      + '{"key":"setting6","children":['
          + '{"key":"doge","children":['
            + '{"key":"wow","oldValue":"","newValue":"so much","type":"UPDATED"}'
          + '],"type":"NESTED"},'
          + '{"key":"key","oldValue":"value","type":"EQUAL"},'
          + '{"key":"ops","newValue":"vops","type":"ADDED"}'
        + '],"type":"NESTED"}'
      + '],"type":"NESTED"},'
      + '{"key":"group1","children":['
        + '{"key":"baz","oldValue":"bas","newValue":"bars","type":"UPDATED"},'
        + '{"key":"foo","oldValue":"bar","type":"EQUAL"},'
        + '{"key":"nest","oldValue":{"key":"value"},"newValue":"str","type":"UPDATED"}'
      + '],"type":"NESTED"},'
      + '{"key":"group2","oldValue":{"abc":12345,"deep":{"id":45}},"type":"REMOVED"},'
      + '{"key":"group3","newValue":{"deep":{"id":{"number":45}},"fee":100500},"type":"ADDED"}'
      + ']';
    expect(json(diffs)).toEqual(expected);
  });
});
