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

  const iter = (changesList, depth) => {
    const bracketPadding = paddingSymbol.repeat(depth * spacesCount - spacesCount);

    const result = changesList.flatMap((change) => {
      const padding = paddingSymbol.repeat(depth * spacesCount - getSpecial(change.type).length);
      switch (change.type) {
        case 'added':
          return `${padding}- ${change.key}: ${stringify(change.value, depth + 1, paddingSymbol, spacesCount)}`;
        case 'removed':
          return `${padding}+ ${change.key}: ${stringify(change.value, depth + 1, paddingSymbol, spacesCount)}`;
        case 'nested':
          return `${padding}${change.key}: ${iter(change.children, depth + 1, paddingSymbol, spacesCount)}`;
        case 'unchanged':
          return `${padding}${change.key}: ${stringify(change.value, depth + 1, paddingSymbol, spacesCount)}`;
        case 'changed': {
          const value1 = `${padding}- ${change.key}: ${stringify(
            change.value1,
            depth + 1,
            paddingSymbol,
            spacesCount,
          )}`;
          const value2 = `${padding}+ ${change.key}: ${stringify(
            change.value2,
            depth + 1,
            paddingSymbol,
            spacesCount,
          )}`;
          return [value1, value2].join('\n');
        }
        default:
          throw new Error(`"${change.type}" is unsupported type`);
      }
    });

    return ['{', ...result, `${bracketPadding}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
