#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import getDiff from '../src/getdiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const targetFile = fs.readFileSync(filepath1);
    const sourceFile = fs.readFileSync(filepath2);
    console.log(getDiff(JSON.parse(targetFile), JSON.parse(sourceFile)));
  });

program.parse(process.argv);
