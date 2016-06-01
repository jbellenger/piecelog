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
      const input = [
          {log_person_id: 'name-1', log_racingage: 1, log_piece_id: 'piece-1'},
          {log_person_id: 'name-1', log_racingage: 2, log_piece_id: 'piece-2'},
          {log_person_id: 'name-2', log_racingage: 3, log_piece_id: 'piece-1'},
      ];

      const result = importer.extractPeople(input);
      assert.deepEqual(result, [
        {id: 'name-1'},
        {id: 'name-2'}
      ]);
    });
  });

  suite('racingDob', () => {
    test('extracts utc dobs', () => {
      const row = {
        log_stamp: new Date(Date.parse('2015-08-22')),
        log_racingage: 34,
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
