import isObject from 'lodash/isObject.js';
import transformStringToData from './parsers.js';

const compareTwoFiles = (filepath1, filepath2) => {
  const file1 = transformStringToData(filepath1);
  const file2 = transformStringToData(filepath2);

  const iter = (data1, data2) => {
    const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

    return keys.map((key) => {
      const key1 = data1[key];
      const key2 = data2[key];
      if (key1 && key2) {
        if (isObject(key1) && isObject(key2)) {
          return { key, status: 'unchanged', value: iter(key1, key2) };
        }
        if (key1 === key2) {
          return { key, status: 'unchanged', value: key1 };
        }
        return { key, status: 'changed', values: { oldValue: key1, newValue: key2 } };
      }
      if (key1) {
        return { key, status: 'saved', value: key1 };
      }
      return { key, status: 'removed', value: key2 };
    });
  };

  console.log(iter(file1, file2));
  return iter(file1, file2);
};

export default compareTwoFiles;
