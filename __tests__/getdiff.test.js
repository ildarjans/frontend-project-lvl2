import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from '@jest/globals';
import getDiff from '../src/getdiff.js';
import parser from '../src/parser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('getDiff. Check returns correct compare results', () => {
  it('Case 1. JSON parser.', () => {
    const filepath1 = getFixturesPath('file1-json.json');
    const filepath2 = getFixturesPath('file2-json.json');
    const target = parser(filepath1);
    const source = parser(filepath2);
    const expected = '{\n '
      + '- follow: false\n '
      + '  host: hexlet.io\n '
      + '- proxy: 123.234.53.22\n '
      + '- timeout: 50\n '
      + '+ timeout: 20\n '
      + '+ verbose: true'
      + '\n}';

    expect(getDiff(target, source)).toEqual(expected);
  });
  it('Case 1. Yml parser.', () => {
    const filepath1 = getFixturesPath('file1-yml.yml');
    const filepath2 = getFixturesPath('file2-yml.yml');
    const target = parser(filepath1);
    const source = parser(filepath2);
    const expected = '{\n '
      + '- follow: false\n '
      + '  host: hexlet.io\n '
      + '- proxy: 123.234.53.22\n '
      + '- timeout: 50\n '
      + '+ timeout: 20\n '
      + '+ verbose: true'
      + '\n}';

    expect(getDiff(target, source)).toEqual(expected);
  });
  it('Case 2. JSON parser.', () => {
    const filepath1 = getFixturesPath('file3-json.json');
    const filepath2 = getFixturesPath('file4-json.json');
    const target = parser(filepath1);
    const source = parser(filepath2);
    const expected = '{\n '
      + '- address: NY\n '
      + '- age: 33\n '
      + '+ alcohol: free\n '
      + '+ cakes: false\n '
      + '- human: true\n '
      + '- married: false\n '
      + '- name: Ivan\n '
      + '+ tobacco: 1\n '
      + '+ vegetables: a lot'
      + '\n}';
    expect(getDiff(target, source)).toEqual(expected);
  });
  it('Case 2. Yaml parser.', () => {
    const filepath1 = getFixturesPath('file3-yaml.yaml');
    const filepath2 = getFixturesPath('file4-yaml.yaml');
    const target = parser(filepath1);
    const source = parser(filepath2);
    const expected = '{\n '
      + '- address: NY\n '
      + '- age: 33\n '
      + '+ alcohol: free\n '
      + '+ cakes: false\n '
      + '- human: true\n '
      + '- married: false\n '
      + '- name: Ivan\n '
      + '+ tobacco: 1\n '
      + '+ vegetables: a lot'
      + '\n}';
    expect(getDiff(target, source)).toEqual(expected);
  });
});
