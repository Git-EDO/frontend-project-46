#!/usr/bin/env node

import { Command } from 'commander';
import { compareTwoFiles } from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to the file 1 to compare')
  .argument('<filepath2>', 'path to the file 2 to compare')
  .action((filepath1, filepath2) => {
    compareTwoFiles(filepath1, filepath2);
  });

program.parse();
