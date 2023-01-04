#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

const command = (filepath1, filepath2) => {
  console.log(genDiff(filepath1, filepath2, program.opts().format));
};

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'relative or absolute path to the file')
  .argument('<filepath2>', 'relative or absolute path to the file')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(command)
  .parse();
