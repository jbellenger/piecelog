require('babel-register');

const importer = require('./importer');
const fs = require('fs');

const outPath = './src/server/mockdb.json';
const sheetKey = process.argv[2];
if (!sheetKey) {
  console.error('sheet key missing. Syntax: npm run import-spreadsheet <sheetkey>');
  process.exit(1);
}

importer.process(sheetKey)
  .then((result) => {
    fs.writeFileSync(outPath, JSON.stringify(result), {encoding: 'utf-8'});
    console.log('wrote', outPath);
  })
  .catch((err) => {
    console.error('Error', err);
    process.exit(1);
  });
