import isObject from 'lodash/isObject.js';

const paddingSymbol = ' ';
const spacesCount = 4;
const getPadding = (depth, space = 0) => paddingSymbol.repeat(depth * spacesCount - space);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return `${value}`;
  }
  const iter = (objData, valueDepth) => {
    const indent = getPadding(valueDepth);
    const result = Object.entries(objData)
      .map(([key, val]) => {
        if (!isObject(val)) {
          return `${indent}${key}: ${val}`;
        }
        return `${indent}${key}: ${iter(val, valueDepth + 1)}`;
      })
      .join('\n');

    return `{\n${result}\n${getPadding(valueDepth, spacesCount)}}`;
  };

  return iter(value, depth);
};

const stylish = (data) => {
  const iter = (changesList, depth) => {
    const result = changesList
      .flatMap((change) => {
        const specialSymbolLength = 2;
        const padding = getPadding(depth, specialSymbolLength);
        switch (change.type) {
          case 'added':
            return `${padding}- ${change.key}: ${stringify(change.value, depth + 1)}`;
          case 'removed':
            return `${padding}+ ${change.key}: ${stringify(change.value, depth + 1)}`;
          case 'nested':
            return `${padding}  ${change.key}: ${iter(change.children, depth + 1)}`;
          case 'unchanged':
            return `${padding}  ${change.key}: ${stringify(change.value, depth + 1)}`;
          case 'changed': {
            const value1 = `${padding}- ${change.key}: ${stringify(change.value1, depth + 1)}`;
            const value2 = `${padding}+ ${change.key}: ${stringify(change.value2, depth + 1)}`;
            return [value1, value2].join('\n');
          }
          default:
            throw new Error(`"${change.type}" is unsupported type`);
        }
      })
      .join('\n');

    return `{\n${result}\n${getPadding(depth, spacesCount)}}`;
  };

  return iter(data, 1);
};

export default stylish;
