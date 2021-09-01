#!/usr/bin/env node

import {Command} from 'commander';
import _ from 'lodash';
import fs from 'fs';

const compare = (obj, source) => {
    const allKeys = _.uniq([..._.keys(obj), ..._.keys(source)]).sort();
    const allDiffs = allKeys.reduce((acc, k) => {
        const hasKeyInObj = _.has(obj, k);
        const hasKeyInSrc = _.has(source, k);

        if (hasKeyInObj && hasKeyInSrc && obj[k] === source[k]) {
            acc.push(`  ${k}: ${obj[k]}`);
        } else if (hasKeyInObj && hasKeyInSrc && obj[k] !== source[k]) {
            acc.push(`- ${k}: ${obj[k]}`);
            acc.push(`+ ${k}: ${source[k]}`);
        } else if (hasKeyInObj && !hasKeyInSrc) {
            acc.push(`- ${k}: ${obj[k]}`);
        } else if (!hasKeyInObj && hasKeyInSrc) {
            acc.push(`+ ${k}: ${source[k]}`);
        }

        return acc;
    }, []);
    return `{\n ${allDiffs.join('\n ')} \n}`
};

const getDiff = (filepath1, filepath2) => {
    const targetFile = fs.readFileSync(filepath1);
    const sourceFile = fs.readFileSync(filepath2);
    return compare(JSON.parse(targetFile), JSON.parse(sourceFile));
}

const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        console.log(getDiff(filepath1, filepath2));
    })

program.parse(process.argv);
