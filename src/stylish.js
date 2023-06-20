const stylish = (array, padding = '.', paddingSize = 2) => {
  const iter = (obj, padSize) => {
    const result = obj.reduce((acc, object) => {
      switch (object.type) {
        case 'saved':
          return `${acc}${padding.repeat(padSize)}- ${object.key}: ${JSON.stringify(
            object.value,
            padding.repeat(padSize),
            padding,
          )
            .replaceAll('"', '')
            .replaceAll(',', '')}\n`;
        case 'removed':
          return `${acc}${padding.repeat(padSize)}+ ${object.key}: ${JSON.stringify(
            object.value,
            padding.repeat(padSize),
            padding,
          )
            .replaceAll('"', '')
            .replaceAll(',', '')}\n`;
        case 'nested':
          return `${acc}${padding.repeat(padSize)}  ${object.key}: ${iter(object.value, padSize * 2)}\n`;
        case 'unchanged':
          return `${acc}${padding.repeat(padSize)}  ${object.key}: ${object.value}\n`;
        case 'changed':
          return `${acc}${padding.repeat(padSize)}- ${object.key}: ${object.values.obj1Value}\n${padding.repeat(
            padSize,
          )}+ ${object.key}: ${object.values.obj2Value}\n`;
        default:
          throw new Error(`"${object.type}" is unsupported type`);
      }
    }, '{\n');

    return `${result}}`;
  };

  return iter(array, paddingSize);
};

export default stylish;
