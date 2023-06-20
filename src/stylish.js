const stylish = (data, paddingSymbol = '.', spacesCount = 2) => {
  const iter = (obj, depth) => {
    const paddingSize = depth * spacesCount;
    const currentPadding = paddingSymbol.repeat(paddingSize);
    const bracketPadding = paddingSymbol.repeat(paddingSize - spacesCount);

    const result = obj.reduce((acc, object) => {
      switch (object.type) {
        case 'saved':
          return `${acc}${currentPadding}- ${object.key}: ${object.value}\n`;
        case 'removed':
          return `${acc}${currentPadding}+ ${object.key}: ${object.value}\n`;
        case 'nested':
          return `${acc}${currentPadding}  ${object.key}: ${iter(object.value, depth + 1)}\n`;
        case 'unchanged':
          return `${acc}${currentPadding}  ${object.key}: ${object.value}\n`;
        case 'changed':
          const obj1Value = `${acc}${currentPadding}- ${object.key}: ${object.values.obj1Value}`;
          const obj2Value = `${currentPadding}+ ${object.key}: ${object.values.obj2Value}`;
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
