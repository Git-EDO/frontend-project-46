import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const getFileDataAsString = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
    const fileData = readFileSync(absolutePath, 'utf-8');
    return fileData.toString();
  } catch (e) {
    throw new Error(`File is not found: ${filepath}`);
  }
};

const transformStringToData = (filepath) => {
  const extension = path.extname(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(getFileDataAsString(filepath));
    case '.yaml':
    case '.yml':
      return yaml.load(getFileDataAsString(filepath));
    default:
      throw new Error(`"${extension}" is unsupported extension`);
  }
};

export default transformStringToData;
