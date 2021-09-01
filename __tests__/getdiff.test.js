import { describe, it, expect } from '@jest/globals';
import getDiff from '../src/getdiff.js';

describe('getDiff. Check returns correct compare results', () => {
  it('Case 1', () => {
    const target = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    const source = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    };
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
  it('Case 2', () => {
    const target = {
      name: 'Ivan',
      age: 33,
      address: 'NY',
      human: true,
      married: false,
    };
    const source = {
      cakes: false,
      vegetables: 'a lot',
      alcohol: 'free',
      tobacco: 1,
    };
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
