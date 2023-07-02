import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  [
    {
      filepath1: 'file1.json',
      filepath2: 'file2.json',
      expectedResult: 'expected-stylish.txt',
    },
  ],
  [{
    filepath1: 'file1.json', filepath2: 'file2.json', expectedResult: 'expected-plain.txt', formatter: 'plain',
  }],
  [{
    filepath1: 'file1.json', filepath2: 'file2.json', expectedResult: 'expected-json.txt', formatter: 'json',
  }],
  [
    {
      filepath1: 'file1.yaml',
      filepath2: 'file2.yaml',
      expectedResult: 'expected-stylish.txt',
      formatter: 'stylish',
    },
  ],
  [{
    filepath1: 'file1.yaml', filepath2: 'file2.yaml', expectedResult: 'expected-plain.txt', formatter: 'plain',
  }],
  [{
    filepath1: 'file1.yaml', filepath2: 'file2.yaml', expectedResult: 'expected-json.txt', formatter: 'json',
  }],
])('diff %#', ({
  filepath1, filepath2, expectedResult, formatter,
}) => {
  const received = gendiff(getFixturePath(filepath1), getFixturePath(filepath2), formatter);
  const expected = readFile(expectedResult);

  expect(received).toEqual(expected);
});
