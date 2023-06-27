import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return (data) => JSON.stringify(data);
    default:
      throw new Error(`"${formatter}" is unsupported formatter`);
  }
};

export default getFormatter;
