import path from 'node:path';
import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/genDiff.js';

test.each([
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish', '__fixtures__/expected-stylish.txt'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain', '__fixtures__/expected-plain.txt'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json', '__fixtures__/expected-json.txt'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish', '__fixtures__/expected-stylish.txt'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain', '__fixtures__/expected-plain.txt'],
  ['__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json', '__fixtures__/expected-json.txt'],
])('test diff (%#)', (file1, file2, format, expectedFile) => {
  const received = gendiff(file1, file2, format);

  const absolutePath = path.resolve(process.cwd(), expectedFile);
  const fileData = readFileSync(absolutePath, 'utf-8');
  const expected = fileData.toString();

  expect(received).toEqual(expected);
});
