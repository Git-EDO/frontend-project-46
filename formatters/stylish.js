import isObject from 'lodash/isObject.js';

const stringify = (value, depth, symbol, space) => {
  if (!isObject(value)) {
    return `${value}`;
  }
  const iter = (objData, valueDepth) => {
    const indent = valueDepth * space;
    const currentIndent = symbol.repeat(indent);
    const bracketsIndent = symbol.repeat(indent - space);
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

const getSpecial = (type) => {
  switch (type) {
    case 'added':
      return '- ';
    case 'removed':
      return '+ ';
    case 'changed':
      return '  ';
    case 'unchanged':
    case 'nested':
      return '';
    default:
      throw new Error(`"${type}" is unsupported type`);
  }
};

const stylish = (data) => {
  const paddingSymbol = ' ';
  const spacesCount = 4;

  const iter = (obj, depth) => {
    const paddingSize = depth * spacesCount;
    const bracketPadding = paddingSymbol.repeat(paddingSize - spacesCount);

    const result = obj.reduce((acc, object) => {
      const padding = paddingSymbol.repeat(paddingSize - getSpecial(object.type).length);
      switch (object.type) {
        case 'added':
          return `${acc}${padding}- ${object.key}: ${stringify(object.value, depth + 1, paddingSymbol, spacesCount)}\n`;
        case 'removed':
          return `${acc}${padding}+ ${object.key}: ${stringify(object.value, depth + 1, paddingSymbol, spacesCount)}\n`;
        case 'nested':
          return `${acc}${padding}${object.key}: ${iter(object.children, depth + 1, paddingSymbol, spacesCount)}\n`;
        case 'unchanged':
          return `${acc}${padding}${object.key}: ${stringify(object.value, depth + 1, paddingSymbol, spacesCount)}\n`;
        case 'changed': {
          const obj1Value = `${acc}${padding}- ${object.key}: ${stringify(
            object.value1,
            depth + 1,
            paddingSymbol,
            spacesCount,
          )}`;
          const obj2Value = `${padding}+ ${object.key}: ${stringify(
            object.value2,
            depth + 1,
            paddingSymbol,
            spacesCount,
          )}`;
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
