'use strict';

const GoogleSpreadsheet = require("google-spreadsheet");
const local = require('../local');
const lodash = require('lodash');
const fs = require('fs');

const sheetKey = local.google_spreadsheet_key;
const auth = local.google_service_auth;
const outputPath = './src/client/mockstate.json';

const sheet = new GoogleSpreadsheet(sheetKey); //, auth);

const dump = (sheet) => {
  return new Promise((resolve, reject) => {
    sheet.getRows((err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};

const parseTime = (string) => {
  if (string) {
    const digits = string.split(':').reverse().map(Number);
    let millis = 0;
    const multis = [1000, 1000 * 60, 1000 * 60 * 60];
    for (let i=0; i < digits.length; i++) {
      millis = millis + digits[i] * multis[i];
    }
    return millis;
  }
};

const parseStamp = (string) => {
  if (string) {
    return new Date(string).getTime();
  }
};

const parseNumber = (string) => {
  if (string) {
    return Number(string);
  }
};

const parseKilos = (string) => {
  if (string) {
    return parseNumber(string) * 0.453592;
  }
};

const parseLogRow = (row) => {
  return {
    name: row.name,
    piece: row.piece,
    stamp: parseStamp(row.realdate),
    distance_meters: parseNumber(row.realmeters),
    time_millis: parseTime(row.realtime),
    weight_kilos: parseKilos(row.pounds),
    racingage: parseNumber(row.racingage),
  };
};

const parseString = (string) => string || undefined;

const parsePieceRow = (row) => {
  return {
    name: row.name,
    stamp: parseStamp(row.date),
    time_millis: parseTime(row.time),
    distance_meters: parseNumber(row.meters),
    description: parseString(row.notes)
  };
}

sheet.getInfo((err, info) => {
  if (err) {
    console.error('error', err);
    process.exit(1);
  }

  const logPromise = dump(info.worksheets.find((sheet) => sheet.title == 'log'))
    .then((rows) => rows.map(parseLogRow));

  const piecesPromise = dump(info.worksheets.find((sheet) => sheet.title == 'pieces'))
    .then((rows) => rows.map(parsePieceRow));

  const peoplePromise = Promise.resolve([]);

  Promise.all([logPromise, piecesPromise, peoplePromise]) 
    .then((results) => {
      const json = {
        log: results[0],
        pieces: results[1],
        people: results[2]
      };

      fs.writeFileSync(outputPath, JSON.stringify(json), {encoding: 'utf-8'});
      console.log('wrote', outputPath);
    })
    .catch((err) => {
      console.error('caught error', err);
      process.exit(1);
    });
})
