import { Router } from 'express';
import cors from 'cors';

let mockdb = {pieces: [], log: [], people: []};
let mockqueries = {
  'all-log-desc': 'select * from log order by stamp desc',
};

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

    if (parsed.queries) {
      json.queries = {};

      Object.keys(parsed.queries).forEach((key) => {
        if (mockqueries[key]) {
          json.queries[key] = mockqueries[key];
        }
      });
    }

    if (parsed.db) {
      json.db = {};
      if (parsed.db.log) {
        json.db.log = mockdb.log;
      }
      if (parsed.db.person) {
        json.db.person = mockdb.person;
      }
      if (parsed.db.piece) {
        json.db.piece = mockdb.piece;
      }
    }
  }
  
  res.json(json);
});
