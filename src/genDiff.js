import transformStringToData from './parsers.js';
import stylish from './stylish.js';

// const compareTwoFiles = (filepath1, filepath2) => {
//   const file1 = transformStringToData(filepath1);
//   const file2 = transformStringToData(filepath2);

//   const result = {};
//   const keys = Array.from(new Set([...Object.keys(file1), ...Object.keys(file2)])).sort();
//   keys.forEach((key) => {
//     if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
//       if (file1[key] === file2[key]) {
//         result[`  ${key}`] = file1[key];
//       } else {
//         result[`- ${key}`] = file1[key];
//         result[`+ ${key}`] = file2[key];
//       }
//     } else if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
//       result[`+ ${key}`] = file2[key];
//     } else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
//       result[`- ${key}`] = file1[key];
//     }
//   });

//   console.log(formatJSONAsString(result));
//   return formatJSONAsString(result);
// };

const compareTwoFiles = (filepath1, filepath2) => {
  const file1 = transformStringToData(filepath1);
  const file2 = transformStringToData(filepath2);

  const compareObjects = (obj1, obj2) => {
    const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

    const result = {};
    for (const key of keys) {
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          result[key] = compareObjects(obj1[key], obj2[key]);
        } else {
          if (obj1[key] === obj2[key]) {
            result[`  ${[key]}`] = obj1[key];
          } else {
            result[`- ${[key]}`] = obj1[key];
            result[`+ ${[key]}`] = obj2[key];
          }
        }
      } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        result[`+ ${[key]}`] =
          typeof obj2[key] === 'object' ? JSON.parse(JSON.stringify(obj2[key], null, 2)) : obj2[key];
      } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
        result[`- ${[key]}`] =
          typeof obj1[key] === 'object' ? JSON.parse(JSON.stringify(obj1[key], null, 2)) : obj1[key];
      }
    }
    return result;
  };
  console.log(compareObjects(file1, file2));

  return compareObjects(file1, file2);
};

export default compareTwoFiles;
