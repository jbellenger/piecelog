import { Router } from 'express';
import cors from 'cors';

let mockdb = {pieces: [], log: [], people: [], results: [], events: [], workouts: []};

try {
  mockdb = require('./mockdb.json');
} catch (err) {
  console.log('mockdb.json not found, defaulting to an empty db');
}

export const middleware = Router();
middleware.use(cors());

middleware.get('/1/bootstrap', (req, res) => {
  const json = {};
  if (req.query.query) {
    const parsed = JSON.parse(req.query.query);

    if (parsed.db) {
      json.db = {};
      if (parsed.db.log) {
        json.db.log = mockdb.log || [];
      }
      if (parsed.db.person) {
        json.db.person = mockdb.person || [];
      }
      if (parsed.db.piece) {
        json.db.piece = mockdb.piece || [];
      }
      if (parsed.db.results) {
        json.db.results = mockdb.results || [];
      }
      if (parsed.db.events) {
        json.db.events = mockdb.events || [];
      }
      if (parsed.db.workouts) {
        json.db.workouts = mockdb.workouts || [];
      }
    }
  }
  
  res.json(json);
});
