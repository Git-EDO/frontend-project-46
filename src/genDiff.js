import isObject from 'lodash/isObject.js';
import has from 'lodash/has.js';
import transformStringToData from './parsers.js';

const compareTwoFiles = (filepath1, filepath2) => {
  const file1 = transformStringToData(filepath1);
  const file2 = transformStringToData(filepath2);

  const iter = (data1, data2) => {
    const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

    return keys.map((key) => {
      const key1 = has(data1, key) ? data1[key] : undefined;
      const key2 = has(data2, key) ? data2[key] : undefined;

      switch (true) {
        case isObject(key1) && isObject(key2):
          return { key, type: 'unchanged', value: iter(key1, key2) };
        case key1 === key2:
          return { key, type: 'unchanged', value: key1 };
        case key1 && !key2:
          return { key, type: 'saved', value: key1 };
        case !key1 && key2:
          return { key, type: 'removed', value: key2 };
        default:
          return { key, type: 'changed', values: { obj1Value: key1, obj2Value: key2 } };
      }
    });
  };

  console.log(iter(file1, file2));
  return iter(file1, file2);
};

export default compareTwoFiles;
