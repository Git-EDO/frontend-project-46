import path from 'node:path';
import { readFileSync } from 'node:fs';

const getAbsolutePathToFile = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
    const absolutePath = getAbsolutePathToFile(filepath);
    return readFileSync(absolutePath, 'utf-8');
};

const formatJSONAsString = (object) => {
    let result = '{\n';
    const paddingSize = 2;
    const padding = ' '.repeat(paddingSize);

    const entries = Object.entries(object)

    for (const [key, value] of entries) {
        const formattedKey = key.replace(/^[+-]/, '');
        const prefix = key.startsWith('-') ? '-' : '+';

        result += `${padding}${key.startsWith(' ') ? '' :prefix} ${formattedKey}: ${value}\n`
    }
    result += '}'

    return result
}

export const compareTwoFiles = (fileData1, fileData2) => {
    const file1 = JSON.parse(getFileData(fileData1))
    const file2 = JSON.parse(getFileData(fileData2))

    const result = {}
    const keys1 = Object.keys(file1)
    const keys2 = Object.keys(file2)
    const keys = Array.from(new Set([...keys1, ...keys2])).sort()
    for(const key of keys) {
        if(file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
            if(file1[key] === file2[key]) {
                result['  ' + key] = file1[key]
            } else {
                result["- " + key] = file1[key]
                result["+ " + key] = file2[key]
            }
        } else if(!file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
            result['+ ' + key] = file2[key]
        } else if(file1.hasOwnProperty(key) && !file2.hasOwnProperty(key)) {
            result['- ' + key] = file1[key]
        }
    }
    console.log(formatJSONAsString(result))
    return result
}
