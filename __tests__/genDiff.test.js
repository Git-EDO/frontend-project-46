import { test, expect } from '@jest/globals';
import gendiff from '../src/genDiff.js';

const jsonFile1 = '__fixtures__/file1.json';
const jsonFile2 = '__fixtures__/file2.json';
const yamlFile1 = '__fixtures__/file1.yaml';
const yamlFile2 = '__fixtures__/file2.yaml';

test('if argument file is doesnt exist', () => {
  expect(() => gendiff(jsonFile1, '__fixtures__/file2222.json')).toThrow(
    'File is not found: __fixtures__/file2222.json',
  );
});

test('if file extension is unsupported', () => {
  expect(() => gendiff('__fixtures__/file1.js', jsonFile2)).toThrow('".js" is unsupported extension');
});

test('if formatter is unsupported', () => {
  expect(() => gendiff(jsonFile1, jsonFile2, 'randomFormatter')).toThrow('"randomFormatter" is unsupported formatter');
});

test('compare nested .json files', () => {
  expect(gendiff(jsonFile1, jsonFile2, 'stylish')).toEqual(
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
  expect(gendiff(yamlFile1, yamlFile2, 'stylish')).toEqual(
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

test('compare nested files by plain formatter', () => {
  expect(gendiff(jsonFile1, jsonFile2, 'plain')).toEqual(
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  );
});

test('compare nested files by json format', () => {
  expect(gendiff(jsonFile1, jsonFile2, 'json')).toEqual(
    `[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "follow",
        "type": "removed",
        "value": false
      },
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "saved",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "values": {
          "obj1Value": true,
          "obj2Value": null
        }
      },
      {
        "key": "setting4",
        "type": "removed",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "removed",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "doge",
            "type": "nested",
            "children": [
              {
                "key": "wow",
                "type": "changed",
                "values": {
                  "obj1Value": "",
                  "obj2Value": "so much"
                }
              }
            ]
          },
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "removed",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "values": {
          "obj1Value": "bas",
          "obj2Value": "bars"
        }
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "values": {
          "obj1Value": {
            "key": "value"
          },
          "obj2Value": "str"
        }
      }
    ]
  },
  {
    "key": "group2",
    "type": "saved",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "type": "removed",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`,
  );
});
