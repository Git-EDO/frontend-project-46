import compareTwoFiles from '../src/genDiff.js';
import { test, expect } from 'jest';

test('if argument file is doesnt exist', () => {
  expect(() => compareTwoFiles('assets/file1.json', 'assets/file22.json')).toThrow(
    'File is not found: assets/file22.json',
  );
});

test('compare files from assets', () => {
  expect(compareTwoFiles('assets/file1.json', 'assets/file2.json')).toEqual(
    `{
  -  follow: false
     host: hexlet.io
  -  proxy: 123.234.53.22
  -  timeout: 50
  +  timeout: 20
  +  verbose: true
}`,
  );
});
