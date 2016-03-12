import { Router } from 'express';
import cors from 'cors';

let db = {pieces: [], log: [], people: []};
try {
  db = require('./mockdb.json');
} catch (err) {
  console.log('mockdb.json not found, defaulting to an empty db');
}

export const middleware = Router();
middleware.use(cors());

middleware.get('/1/bootstrap', (req, res) => {
  const { log, people, pieces } = req.query;
  const data = {};
  if (log === 'true') {
    data.log = db.log;
  }
  if (people === 'true') {
    data.people = db.people;
  }
  if (pieces === 'true') {
    data.pieces = db.pieces;
  }
  res.json(data);
});
