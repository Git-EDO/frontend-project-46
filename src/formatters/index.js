import stylish from './stylish.js';
import plain from './plain.js';

const format = (formatter, data) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`"${formatter}" is unsupported formatter`);
  }
};

export default format;
