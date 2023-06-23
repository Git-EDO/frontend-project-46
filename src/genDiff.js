import isObject from 'lodash/isObject.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import transformStringToData from './parsers.js';
import getFormatter from '../formatters/index.js';

const getAST = (filedata1, filedata2) => {
  const iter = (data1, data2) => {
    const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));

    return keys.map((key) => {
      const key1 = data1[key];
      const key2 = data2[key];

      switch (true) {
        case !has(data2, key):
          return { key, type: 'saved', value: key1 };
        case !has(data1, key):
          return { key, type: 'removed', value: key2 };
        case isObject(key1) && isObject(key2):
          return { key, type: 'nested', children: iter(key1, key2) };
        case key1 === key2:
          return { key, type: 'unchanged', value: key1 };
        default:
          return { key, type: 'changed', values: { obj1Value: key1, obj2Value: key2 } };
      }
    });
  };

  return iter(filedata1, filedata2);
};

const gendiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1 = transformStringToData(filepath1);
  const file2 = transformStringToData(filepath2);

  const diff = getAST(file1, file2);
  const selectedFormatter = getFormatter(formatter);

  console.log(selectedFormatter(diff));
  return selectedFormatter(diff);
};

export default gendiff;
