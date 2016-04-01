import './alasql-patch';
import alasql from 'alasql';

const DEFAULT_DB_NAME = 'piecelog';

export default class Database {
  constructor(dbname) {
    this.sql = new alasql.Database(dbname || DEFAULT_DB_NAME);
  }

  install(data) {
    this.sql.tables = {};
    Object.keys(data).forEach((key) => {
      this.sql.exec(`CREATE TABLE ${key}`);
      this.sql.tables[key].data = data[key];
    });
    return this;
  }

  exec(...args) {
    return this.sql.exec(...args);
  }
}
