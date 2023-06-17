import { test, expect } from '@jest/globals';
import compareTwoFiles from '../src/genDiff.js';

test('if argument file is doesnt exist', () => {
  expect(() => compareTwoFiles('assets/file1.json', 'assets/file22.json')).toThrow(
    'File is not found: assets/file22.json',
  );
});

test('if file extension is unsupported', () => {
  expect(() => compareTwoFiles('assets/file1.js', 'assets/file22.json')).toThrow('".js" is unsupported extension');
});

test('compare .json files from assets', () => {
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

test('compare .yaml files from assets', () => {
  expect(compareTwoFiles('assets/file1.yaml', 'assets/file2.yaml')).toEqual(
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
