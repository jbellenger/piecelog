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
    log_person_id: row.name,
    log_piece_id: row.piece,
    log_stamp: parseStamp(row.realdate),
    log_distance_meters: parseNumber(row.realmeters),
    log_time_millis: parseTime(row.realtime),
    log_racingage: parseNumber(row.racingage),
    log_weight_kilos: parseKilos(row.pounds),
  };
};

const parseString = (string) => string || undefined;

export const parsePieceRow = (row) => {
  return {
    piece_id: row.name,
    piece_stamp: parseStamp(row.date),
    piece_time_millis: parseTime(row.time),
    piece_distance_meters: parseNumber(row.meters),
    piece_description: parseString(row.notes)
  };
};

export const racingDob = (logEntry) => {
  const stamp = logEntry.log_stamp;
  const racingage = logEntry.log_racingage;
  if (racingage && stamp) {
    const birthYear = new Date(stamp).getUTCFullYear() - racingage;
    const rdob = new Date(0);
    rdob.setUTCFullYear(birthYear);
    return rdob;
  }
};

export const extractPeople = (log) => {
  const people = {};

  log.forEach((row) => {
    const person = {person_id: row.log_person_id};
    const dob = racingDob(row);
    if (dob) {
      person.person_dob = dob;
    }

    people[person.person_id] = person;
  });

  return lodash.values(people);
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
        .then(([log, piece]) => {
          resolve({
            log,
            piece,
            person: extractPeople(log)
          });
        })
        .catch(reject);
    });
  });
};
