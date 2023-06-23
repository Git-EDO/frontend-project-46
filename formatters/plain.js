import isObject from 'lodash/isObject.js';

const plain = (data) => {
  const normalize = (value) => {
    if (isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const iter = (objData, pathArray) => objData.reduce((acc, change) => {
    const propertyName = pathArray.length === 0 ? change.key : [...pathArray, change.key].join('.');
    switch (change.type) {
      case 'removed':
        return `${acc}Property '${propertyName}' was added with value: ${normalize(change.value)}\n`;
      case 'saved':
        return `${acc}Property '${propertyName}' was removed\n`;
      case 'changed':
        return `${acc}Property '${propertyName}' was updated. From ${normalize(
          change.values.obj1Value,
        )} to ${normalize(change.values.obj2Value)}\n`;
      case 'nested': {
        return `${acc}${iter(change.children, [...pathArray, change.key])}`;
      }
      default:
        return acc;
    }
  }, '');

  return iter(data, []).trim();
};

export default plain;
