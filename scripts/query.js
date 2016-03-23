import alasql from 'alasql';
import Database from '../src/client/modules/db';
import mockdb from '../src/server/mockdb.json';
import util from 'util';

const db = new Database().install(mockdb);
const query = process.argv[2];
if (!query) {
  console.error('no query specified');
  process.exit(1);
}

try {
  const result = db.exec(query);
  console.log(util.inspect(result));
} catch (err) {
  console.error('error', err);
  process.exit(2);
}
