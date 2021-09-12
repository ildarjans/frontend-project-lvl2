import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from '@jest/globals';
import getDiff from '../src/getdiff.js';
import parser from '../src/parser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('Check getDiff engine returns correct results', () => {
  it('Case 1. Diff engine with JSON parser.', () => {
    const target = parser(getFixturesPath('file1-json.json'));
    const source = parser(getFixturesPath('file2-json.json'));
    const expected = [
      { key: 'follow', oldValue: false, type: 'MISSED' },
      { key: 'host', oldValue: 'hexlet.io', type: 'SAME' },
      { key: 'proxy', oldValue: '123.234.53.22', type: 'MISSED' },
      {
        key: 'timeout', oldValue: 50, newValue: 20, type: 'UPDATED',
      },
      { key: 'verbose', newValue: true, type: 'NEW' },
    ];
    expect(getDiff(target, source)).toEqual(expected);
  });
  it('Case 2. Diff engine with Yml parser.', () => {
    const target = parser(getFixturesPath('file1-yml.yml'));
    const source = parser(getFixturesPath('file2-yml.yml'));
    const expected = [
      { key: 'follow', oldValue: false, type: 'MISSED' },
      { key: 'host', oldValue: 'hexlet.io', type: 'SAME' },
      { key: 'proxy', oldValue: '123.234.53.22', type: 'MISSED' },
      {
        key: 'timeout', oldValue: 50, newValue: 20, type: 'UPDATED',
      },
      { key: 'verbose', newValue: true, type: 'NEW' },
    ];

    expect(getDiff(target, source)).toEqual(expected);
  });
});
