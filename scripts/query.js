import alasql from 'alasql';
import Models from '../src/client/modules/model/Models';
import mockdb from '../src/server/mockdb.json';
import util from 'util';
import readline from 'readline';

const db = new Models().install(mockdb);

const query = process.argv[2];

if (query) {
  try {
    const result = db.exec(query);
    console.log(util.inspect(result));
    process.exit(0);
  } catch (err) {
    console.error('error', err);
    process.exit(2);
  }
}

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('sql> ');
rl.prompt();

rl.on('line', (line) => {
  if (line.trim()) {
    try {
      const result = db.exec(line.trim());
      console.log(util.inspect(result));
    } catch (err) {
      console.error('Error:', err);
    }
  }
  rl.prompt();
});

rl.on('close', () => process.exit(0));
