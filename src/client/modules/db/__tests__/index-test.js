import { assert } from 'chai';
import Database from '../';
import alasql from 'alasql';

suite('db', () => {
  const testData = {
    t1: [
      {a: 'A1', b: 'B1'},
      {a: 'A2', b: 'B2'}
    ],
    t2: [
      {c: 'C1', d: 'D1'},
      {c: 'C2', b: 'D2'}
    ]
  };
  suite('constructor', () => {
    test('handles default dbname', () => {
      const db = new Database();
      assert.isObject(alasql.databases.piecelog);
    });

    test('accepts dbname', () => {
      const db = new Database('testdb');
      assert.isObject(alasql.databases.testdb);
    });
  });

  suite('install', () => {
    test('installs provided tables', () => {
      const db = new Database();
      db.install(testData);
      assert.deepEqual(db.sql.tables.t1.data, testData.t1);
      assert.deepEqual(db.sql.tables.t2.data, testData.t2);
    });

    test('returns this', () => {
      const db1 = new Database();
      const db2 = db1.install({});
      assert.equal(db1, db2);
    });

    test('does not overlap instances', () => {
      const db1 = new Database();
      const db2 = new Database().install(testData);

      assert.deepEqual(db2.sql.tables.t1.data, testData.t1);
      assert.deepEqual(db1.sql.tables, {});
    });
  });

  suite('exec', () => {
    test('executes valid queries', () => {
      const db = new Database();
      assert.deepEqual(db.exec('select 1'), [{'1': 1}]);
    });

    test('executes parameterized queries', () => {
      const db = new Database();
      assert.deepEqual(db.exec('select ?', [1]), [{'$0': 1}]);
    });

    test('returns expected results', () => {
      const db = new Database().install(testData);
      assert.deepEqual(
        db.exec('select * from t1 where a = "A1"'),
        [{a: 'A1', b: 'B1'}]
      );
    });

    test('throws on invalid queries', () => {
      const db = new Database();
      assert.throws(() => db.exec('INVALID QUERY'));
    });
  });
});
