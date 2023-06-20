import isObject from 'lodash/isObject.js';

const stylish = (data, paddingSymbol = ' ', spacesCount = 2) => {
  const stringify = (value, depth) => {
    if (!isObject(value)) {
      return `${value}`;
    }
    const iter = (data, valueDepth) => {
      const pad = valueDepth * spacesCount;
      const curPad = paddingSymbol.repeat(pad);
      const brackPad = paddingSymbol.repeat(pad - spacesCount);
      const result = Object.entries(data).reduce((acc, [key, val]) => {
        if (!isObject(val)) {
          return `${acc}${curPad}${key}: ${val}\n`;
        }
        return `${acc}${curPad}${key}: ${iter(val, valueDepth + 1)}\n`;
      }, '{\n');
      return `${result}${brackPad}}`;
    };

    return iter(value, depth);
  };

  const iter = (obj, depth) => {
    const paddingSize = depth * spacesCount;
    const currentPadding = paddingSymbol.repeat(paddingSize);
    const bracketPadding = paddingSymbol.repeat(paddingSize - spacesCount);

    const result = obj.reduce((acc, object) => {
      switch (object.type) {
        case 'saved':
          return `${acc}${currentPadding}- ${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'removed':
          return `${acc}${currentPadding}+ ${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'nested':
          return `${acc}${currentPadding}  ${object.key}: ${iter(object.children, depth + 1)}\n`;
        case 'unchanged':
          return `${acc}${currentPadding}  ${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'changed':
          const obj1Value = `${acc}${currentPadding}- ${object.key}: ${stringify(object.values.obj1Value, depth + 1)}`;
          const obj2Value = `${currentPadding}+ ${object.key}: ${stringify(object.values.obj2Value, depth + 1)}`;
          return `${obj1Value}\n${obj2Value}\n`;
        default:
          throw new Error(`"${object.type}" is unsupported type`);
      }
    }, '{\n');

    return `${result}${bracketPadding}}`;
  };

  return iter(data, 1);
};

export default stylish;
