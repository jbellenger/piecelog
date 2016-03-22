import alasql from 'alasql';
import './alasql-patch';

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

  exec(query) {
    return this.sql.exec(query);
  }
}
