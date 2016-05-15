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

export const normalizeLogRow = (row) => {
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

export const normalizePieceRow = (row) => {
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

export const extractWorkoutId = (workout_pieces) => {
  const baseName = (arch) => {
    const millis = arch.time_millis;
    const meters = arch.distance_meters;

    if (millis) {
      const minutes = millis / (1000 * 60);
      return `${minutes}min`;
    } else if (meters) {
      if (meters >= 1000 && meters % 1000 === 0) {
        const kms = meters/1000;
        return `${kms}k`;
      }
      return `${meters}m`;
    }
  };
  const base = baseName(workout_pieces[0]);
  const count = workout_pieces.length;
  return count > 1 ?
    `${count} x ${base}` :
    base;
};

export const extractWorkouts = (log, pieces) => {
  const findPiece = (row) => lodash.find(pieces, (p) => p.piece_id === row.log_piece_id);

  const filtered = log.filter((row) => !row.log_piece_id.startsWith('misc-'));
  const pieceGroups = lodash.groupBy(filtered, (row) => row.log_piece_id);

  const allWorkouts = lodash.values(pieceGroups).map((pieceRows) => {
    const personRows = lodash.groupBy(pieceRows, (row) => row.log_person_id);
    const typicalSet = lodash.maxBy(lodash.values(personRows), (rows) => rows.length);
    const workout_pieces = typicalSet.map((row) => {
      const piece = findPiece(row);
      const p = {};
      if (piece.piece_time_millis) {
        p.time_millis = piece.piece_time_millis;
      }
      if (piece.piece_distance_meters) {
        p.distance_meters = piece.piece_distance_meters;
      }
      return p;
    });

    const workout = {
      workout_pieces,
      workout_id: extractWorkoutId(workout_pieces),
    };

    // annotate matching pieces with workout_id, to be picked up in
    // extractSchedule
    pieceRows.map((row) => {
      const piece = findPiece(row);
      piece.piece_workout_id = workout.workout_id;
    });

    return workout;
  });

  return lodash.uniqBy(allWorkouts, (wo) => wo.workout_id);
};

export const extractEvents = (pieces) => pieces
  .filter((p) => !p.piece_id.startsWith('misc-'))
  .map((piece) => ({
    event_id: piece.piece_stamp, // JMB TODO: use guids?
    event_stamp: piece.piece_stamp,
    event_workout_id: piece.piece_workout_id,
  }));

export const extractResults = (log, pieces, workouts, events) => {
  const pieceGroups = lodash.groupBy(log, (row) => row.log_piece_id);
  const results = [];
  lodash.mapKeys(pieceGroups, (pieceRows, log_piece_id) => {
    const personGroups = lodash.groupBy(pieceRows, (row) => row.log_person_id);
    const piece = lodash.find(pieces, (p) => p.piece_id === log_piece_id);
    const event = lodash.find(events, (e) => e.event_stamp === piece.piece_stamp);

    lodash.mapKeys(personGroups, (personRows, log_person_id) => {
      const base = personRows[0];
      const workout = lodash.find(workouts, (wo) => wo.workout_id === piece.piece_workout_id);
      if (!workout) {
        console.log('dropping rows', personRows);
        return;
      }
      results.push({
        result_person_id: log_person_id,
        result_event_id: event && event.event_id,
        result_workout_id: workout.workout_id,
        result_stamp: base.log_stamp,
        result_weight_kilos: base.log_weight_kilos,
        result_racingage: base.log_racingage,
        result_entries: personRows.map((row) => ({
          distance_meters: row.log_distance_meters,
          time_millis: row.log_time_millis,
        })),
      });
    });
  })
  return results;
};

export const annotatePieces = (pieces, workouts) => pieces
  .filter((p) => !p.piece_workout_id)
  .forEach((p) => {
    const match = p.piece_id.match(/misc-(.*)/);
    if (match) {
      const workout = workouts.find((wo) => wo.workout_id === match[1]);
      if (workout) {
        p.piece_workout_id = workout.workout_id;
      }
    }
  });

export const process = (sheetKey) => {
  const sheet = new GoogleSpreadsheet(sheetKey);
  return new Promise((resolve, reject) => {
    sheet.getInfo((err, info) => {
      if (err) {
        return reject(err);
      }

      const logPromise = dump(info.worksheets.find((sheet) => sheet.title === 'log'))
        .then((rows) => rows.map(normalizeLogRow));

      const piecesPromise = dump(info.worksheets.find((sheet) => sheet.title === 'pieces'))
        .then((rows) => rows.map(normalizePieceRow));

      Promise.all([logPromise, piecesPromise]) 
        .then(([log, pieces]) => {
          const workouts = extractWorkouts(log, pieces);
          annotatePieces(pieces, workouts);
          const events = extractEvents(pieces);
          const results = extractResults(log, pieces, workouts, events);

          resolve({
            log,
            person: extractPeople(log),
            piece: pieces,
            workouts,
            events,
            results,
          });
        })
        .catch(reject);
    });
  });
};
