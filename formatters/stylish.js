import isObject from 'lodash/isObject.js';

const stylish = (data, paddingSymbol = ' ', spacesCount = 4) => {
  const stringify = (value, depth) => {
    if (!isObject(value)) {
      return `${value}`;
    }
    const iter = (objData, valueDepth) => {
      const indent = valueDepth * spacesCount;
      const currentIndent = paddingSymbol.repeat(indent);
      const bracketsIndent = paddingSymbol.repeat(indent - spacesCount);
      const result = Object.entries(objData).reduce((acc, [key, val]) => {
        if (!isObject(val)) {
          return `${acc}${currentIndent}${key}: ${val}\n`;
        }
        return `${acc}${currentIndent}${key}: ${iter(val, valueDepth + 1)}\n`;
      }, '{\n');
      return `${result}${bracketsIndent}}`;
    };

    return iter(value, depth);
  };

  const iter = (obj, depth) => {
    const specialSymbolsLength = 2;
    const paddingSize = depth * spacesCount;
    const nestedPadding = paddingSymbol.repeat(paddingSize);
    const currentPadding = paddingSymbol.repeat(paddingSize - specialSymbolsLength);
    const bracketPadding = paddingSymbol.repeat(paddingSize - spacesCount);

    const result = obj.reduce((acc, object) => {
      switch (object.type) {
        case 'saved':
          return `${acc}${currentPadding}- ${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'removed':
          return `${acc}${currentPadding}+ ${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'nested':
          return `${acc}${nestedPadding}${object.key}: ${iter(object.children, depth + 1)}\n`;
        case 'unchanged':
          return `${acc}${nestedPadding}${object.key}: ${stringify(object.value, depth + 1)}\n`;
        case 'changed': {
          const obj1Value = `${acc}${currentPadding}- ${object.key}: ${stringify(object.values.obj1Value, depth + 1)}`;
          const obj2Value = `${currentPadding}+ ${object.key}: ${stringify(object.values.obj2Value, depth + 1)}`;
          return `${obj1Value}\n${obj2Value}\n`;
        }
        default:
          throw new Error(`"${object.type}" is unsupported type`);
      }
    }, '{\n');

    return `${result}${bracketPadding}}`;
  };

  return iter(data, 1);
};

export default stylish;