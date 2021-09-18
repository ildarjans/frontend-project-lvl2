import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from '@jest/globals';
import gendiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturesPath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('Check \'gendiff\' returns correct \'stylish\' formatted result', () => {
  it('Compares two plain yml files.', () => {
    const filepath1 = getFixturesPath('file1.yml');
    const filepath2 = getFixturesPath('file2.yaml');
    const expected = '{\n'
      + '  - follow: false\n'
      + '    host: hexlet.io\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - timeout: 50\n'
      + '  + timeout: 20\n'
      + '  + verbose: true\n'
      + '}';

    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });
  it('Compares well two nested json files.', () => {
    const filepath1 = getFixturesPath('file3.json');
    const filepath2 = getFixturesPath('file4.json');
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

    expect(gendiff(filepath1, filepath2)).toEqual(expected);
  });
});
describe('Check \'gendiff\' returns correct \'plain\' formatted result', () => {
  it('Compares two plain yml files.', () => {
    const filepath1 = getFixturesPath('file1.yml');
    const filepath2 = getFixturesPath('file2.yaml');
    const expected = ''
      + 'Property \'follow\' was removed'
      + '\nProperty \'proxy\' was removed'
      + '\nProperty \'timeout\' was updated. From 50 to 20'
      + '\nProperty \'verbose\' was added with value: true';
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expected);
  });
  it('genDiff compares well two nested json files.', () => {
    const filepath1 = getFixturesPath('file3.json');
    const filepath2 = getFixturesPath('file4.json');
    const expected = ''
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
      + '\nProperty \'group3\' was added with value: [complex value]';

    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expected);
  });
});
describe('Check \'gendiff\' returns correct \'json\' formatted result', () => {
  it('Compares two plain yml files.', () => {
    const filepath1 = getFixturesPath('file1.yml');
    const filepath2 = getFixturesPath('file2.yaml');
    const expected = '['
      + '{"key":"follow","oldValue":false,"type":"REMOVED"},'
      + '{"key":"host","oldValue":"hexlet.io","type":"EQUAL"},'
      + '{"key":"proxy","oldValue":"123.234.53.22","type":"REMOVED"},'
      + '{"key":"timeout","oldValue":50,"newValue":20,"type":"UPDATED"},'
      + '{"key":"verbose","newValue":true,"type":"ADDED"}'
      + ']';
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expected);
  });
  it('genDiff compares well two nested json files.', () => {
    const filepath1 = getFixturesPath('file3.json');
    const filepath2 = getFixturesPath('file4.json');
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

    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expected);
  });
});
