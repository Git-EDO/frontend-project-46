import { test, expect } from '@jest/globals';
import compareTwoFiles from '../src/genDiff.js';

const jsonFile1 = '__fixtures__/file1.json';
const jsonFile2 = '__fixtures__/file2.json';
const yamlFile1 = '__fixtures__/file1.yaml';
const yamlFile2 = '__fixtures__/file2.yaml';

test('if argument file is doesnt exist', () => {
  expect(() => compareTwoFiles(jsonFile1, jsonFile2).toThrow('File is not found: __fixtures__/file22.json'));
});

test('if file extension is unsupported', () => {
  expect(() => compareTwoFiles('__fixtures__/file1.js', jsonFile2).toThrow('".js" is unsupported extension'));
});

test('compare .json files from assets', () => {
  expect(compareTwoFiles(jsonFile1, jsonFile2)).toEqual(
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
  expect(compareTwoFiles(yamlFile1, yamlFile2)).toEqual(
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
