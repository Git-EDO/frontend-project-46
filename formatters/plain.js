import isObject from 'lodash/isObject.js';

const stringify = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const iter = (node, pathArray) =>
    node
      .map((change) => {
        const propertyName = pathArray.length === 0 ? change.key : [...pathArray, change.key].join('.');
        switch (change.type) {
          case 'removed':
            return `Property '${propertyName}' was added with value: ${stringify(change.value)}`;
          case 'added':
            return `Property '${propertyName}' was removed`;
          case 'changed':
            return `Property '${propertyName}' was updated. From ${stringify(change.value1)} to ${stringify(
              change.value2,
            )}`;
          case 'nested': {
            return `${iter(change.children, [...pathArray, change.key])}`;
          }
          case 'unchanged':
            return null;
          default:
            throw new Error(`"${change.type}" is unsupported type`);
        }
      })
      .filter((change) => change)
      .join('\n');

  return iter(data, []);
};

export default plain;
