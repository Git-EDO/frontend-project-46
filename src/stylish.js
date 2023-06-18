const stylish = (object, padding = ' ', paddingSize = 2) => {
  const entries = Object.entries(object);

  const result = entries.reduce((acc, [key, value]) => {
    const formattedKey = key.replace(/^[+-]/, '');
    const prefix = key.startsWith('-') ? '-' : '+';

    return `${acc}${padding.repeat(paddingSize)}${key.startsWith(' ') ? '' : prefix} ${formattedKey}: ${value}\n`; // eslint-disable-line no-param-reassign
  }, '{\n');

  return `${result}}`;
};

export default stylish;
