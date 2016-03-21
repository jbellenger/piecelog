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

  suite('fillPeople', () => {
    test('fillsPeople', () => {
      const input = {
        log: [
          {name: 'name-1', racingage: 1, piece: 'piece-1'},
          {name: 'name-1', racingage: 2, piece: 'piece-2'},
          {name: 'name-2', racingage: 3, piece: 'piece-1'},
        ],
      };

      const result = importer.fillPeople(input);
      assert.deepEqual(result.people, [
        {name: 'name-1'},
        {name: 'name-2'}
      ]);
    });
  });

  suite('racingDob', () => {
    test('extracts utc dobs', () => {
      const row = {
        stamp: new Date(Date.parse('2015-08-22')),
        racingage: 34,
      };
      const dob = importer.racingDob(row);
      assert.equal(dob.getTime(), Date.parse('1981-01-01'));
    });

    test('returns undefined if racingage is missing', () => {
      assert.isUndefined(importer.racingDob({stamp: new Date()}));
    });

    test('returns undefined if stamp is missing', () => {
      assert.isUndefined(importer.racingDob({racingage: 34}));
    });
  });
});
