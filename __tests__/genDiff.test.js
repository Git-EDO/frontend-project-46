import { test, expect, beforeAll } from '@jest/globals';
import compareTwoFiles from '../src/genDiff.js';

let jsonFile1; let jsonFile2; let yamlFile1; let
  yamlFile2;

beforeAll(() => {
  jsonFile1 = '__fixtures__/file1.json';
  jsonFile2 = '__fixtures__/file2.json';
  yamlFile1 = '__fixtures__/file1.yaml';
  yamlFile2 = '__fixtures__/file2.yaml';
});

test('if argument file is doesnt exist', () => {
  expect(() => compareTwoFiles(jsonFile1, '__fixtures__/file2222.json').toThrow('File is not found: __fixtures__/file2222.json'));
});

test('if file extension is unsupported', () => {
  expect(() => compareTwoFiles('__fixtures__/file1.js', jsonFile2).toThrow('".js" is unsupported extension'));
});

test('if formatter is unsupported', () => {
  expect(() => compareTwoFiles(jsonFile1, jsonFile2, 'randomFormatter').toThrow('"randomFormatter" is unsupported formatter'));
});

test('compare nested .json files', () => {
  expect(compareTwoFiles(jsonFile1, jsonFile2, 'stylish')).toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});

test('compare nested .yaml files', () => {
  expect(compareTwoFiles(yamlFile1, yamlFile2, 'stylish')).toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});
