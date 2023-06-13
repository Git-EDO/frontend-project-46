import path from 'node:path';
import { readFileSync } from 'node:fs';

const getFileData = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
    const fileData = readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (e) {
    throw new Error(`File is not found: ${filepath}`)
  }
};

const formatJSONAsString = (object) => {
  const paddingSize = 2;
  const padding = ' '.repeat(paddingSize);
  const entries = Object.entries(object);

  const result = entries.reduce((acc, [key, value]) => {
    const formattedKey = key.replace(/^[+-]/, '');
    const prefix = key.startsWith('-') ? '-' : '+';

    acc = `${acc}${padding}${key.startsWith(' ') ? '' : prefix} ${formattedKey}: ${value}\n`;
    return acc
  }, '{\n');

  return result + '}';
};

export const compareTwoFiles = (fileData1, fileData2) => {
  const file1 = getFileData(fileData1);
  const file2 = getFileData(fileData2);

  const result = {};
  const keys = Array.from(new Set([...Object.keys(file1), ...Object.keys(file2)])).sort();
  keys.forEach(key => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (file1[key] === file2[key]) {
          result[`  ${key}`] = file1[key];
        } else {
          result[`- ${key}`] = file1[key];
          result[`+ ${key}`] = file2[key];
        }
      } else if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        result[`+ ${key}`] = file2[key];
      } else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        result[`- ${key}`] = file1[key];
      }
  })

  console.log(formatJSONAsString(result))
  return formatJSONAsString(result);
};
