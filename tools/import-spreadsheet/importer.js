'use strict';

import GoogleSpreadsheet from 'google-spreadsheet';
import lodash from 'lodash';

const dump = (sheet) => {
  return new Promise((resolve, reject) => {
    sheet.getRows((err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const parseTime = (string) => {
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

export const parseStamp = (string) => {
  if (string) {
    return new Date(string).getTime();
  }
};

export const parseNumber = (string) => {
  if (string) {
    return Number(string);
  }
};

export const parseKilos = (string) => {
  if (string) {
    return parseNumber(string) * 0.453592;
  }
};

export const parseLogRow = (row) => {
  return {
    person_id: row.name,
    piece_id: row.piece,
    stamp: parseStamp(row.realdate),
    distance_meters: parseNumber(row.realmeters),
    time_millis: parseTime(row.realtime),
    weight_kilos: parseKilos(row.pounds),
    racingage: parseNumber(row.racingage),
  };
};

const parseString = (string) => string || undefined;

export const parsePieceRow = (row) => {
  return {
    piece_id: row.name,
    stamp: parseStamp(row.date),
    time_millis: parseTime(row.time),
    distance_meters: parseNumber(row.meters),
    description: parseString(row.notes)
  };
};

export const racingDob = (logEntry) => {
  const {stamp, racingage} = logEntry;
  if (racingage && stamp) {
    const birthYear = new Date(stamp).getUTCFullYear() - racingage;
    const dob = new Date(Date.parse('1900-01-01'));
    dob.setUTCFullYear(birthYear);
    return dob;
  }
};

export const fillPeople = (db) => {
  const {log} = db;

  const people = {};
  log.forEach((row) => {
    const person = {person_id: row.person_id};
    const dob = racingDob(row);
    if (dob) {
      person.racingdob = dob;
    }

    people[row.person_id] = person;
  });

  return {
    ...db,
    people: lodash.values(people),
  };
};

export const process = (sheetKey) => {
  const sheet = new GoogleSpreadsheet(sheetKey);
  return new Promise((resolve, reject) => {
    sheet.getInfo((err, info) => {
      if (err) {
        return reject(err);
      }

      const logPromise = dump(info.worksheets.find((sheet) => sheet.title === 'log'))
        .then((rows) => rows.map(parseLogRow));

      const piecesPromise = dump(info.worksheets.find((sheet) => sheet.title === 'pieces'))
        .then((rows) => rows.map(parsePieceRow));

      Promise.all([logPromise, piecesPromise]) 
        .then(([log, pieces]) => {
          let result = {log, pieces, people: []};
          result = fillPeople(result);
          resolve(result);
        })
        .catch(reject);
    });
  });
};
