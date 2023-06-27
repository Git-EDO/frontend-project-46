import path from 'node:path';
import { readFileSync } from 'node:fs';
import isObject from 'lodash/isObject.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isEqual from 'lodash/isEqual.js';
import parser from './parser.js';
import getFormatter from '../formatters/index.js';

const getAST = (filedata1, filedata2) => {
  const iter = (data1, data2) => {
    const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));

    return keys.map((key) => {
      switch (true) {
        case !has(data2, key):
          return { key, type: 'added', value: data1[key] };
        case !has(data1, key):
          return { key, type: 'removed', value: data2[key] };
        case isObject(data1[key]) && isObject(data2[key]):
          return { key, type: 'nested', children: iter(data1[key], data2[key]) };
        case isEqual(data1[key], data2[key]):
          return { key, type: 'unchanged', value: data1[key] };
        default:
          return {
            key,
            type: 'changed',
            value1: data1[key],
            value2: data2[key],
          };
      }
    });
  };

  return iter(filedata1, filedata2);
};

const gendiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fileData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  const extension = (filepath) => path.extname(filepath);

  const file1 = parser(fileData(filepath1), extension(filepath1));
  const file2 = parser(fileData(filepath2), extension(filepath2));

  const diff = getAST(file1, file2);
  const selectedFormatter = getFormatter(formatter);

  return selectedFormatter(diff);
};

export default gendiff;
