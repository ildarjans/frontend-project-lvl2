#!/usr/bin/env node

import { Command } from 'commander';
import parser from '../src/parser.js';
import getDiff from '../src/getdiff.js';
import Formats from '../src/formats/formats.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const target = parser(filepath1);
    const source = parser(filepath2);
    console.log(Formats[format](getDiff(target, source)));
  });

program.parse(process.argv);
