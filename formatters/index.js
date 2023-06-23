import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './toJson.js';

const getFormatter = (formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return toJson;
    default:
      throw new Error(`"${formatter}" is unsupported formatter`);
  }
};

export default getFormatter;
