import yaml from 'js-yaml';

const parse = (data, extension) => {
  const ext = extension.replace('.', '');
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`"${extension}" is unsupported extension`);
  }
};

export default parse;
