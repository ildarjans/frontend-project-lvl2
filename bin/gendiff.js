#!/usr/bin/env node

import { Command } from 'commander';
import parser from '../src/parser.js';
import getDiff from '../src/getdiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const target = parser(filepath1);
    const source = parser(filepath2);
    console.log(getDiff(target, source));
  });

program.parse(process.argv);
