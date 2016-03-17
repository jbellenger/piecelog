import { assert } from 'chai';
import * as importer from '../importer';

suite('importer', () => {
  suite('parseNumber', () => {
    test('parses valid strings', () => {
      assert.equal(importer.parseNumber('1'), 1);
    });

    test('returns undefined for empty strings', () => {
      assert.isUndefined(importer.parseNumber(''));
      assert.equal(importer.parseNumber('1'), 1);
    });
  });

  suite('extractPeople', () => {
    test('extracts people', () => {
      const log = [
        {name: 'name-1', racingage: 1, piece: 'piece-1'},
        {name: 'name-1', racingage: 2, piece: 'piece-2'},
        {name: 'name-2', racingage: 3, piece: 'piece-1'},
      ];

      const result = importer.extractPeople(log);
      assert.deepEqual(result, [
        {name: 'name-1'},
        {name: 'name-2'}
      ]);
    });
  });
});
