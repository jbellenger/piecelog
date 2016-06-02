import { Router } from 'express';
import cors from 'cors';
import fs from 'fs';

const loadMockDb = () => {
  try {
    const path = require.resolve('./mockdb.json');
    const body = fs.readFileSync(path, {encoding: 'utf8'});
    return JSON.parse(body);
  } catch (err) {
    return {};
  }
};

export const middleware = Router();
middleware.use(cors());

middleware.get('/1/bootstrap', (req, res) => {
  const json = {};
  if (req.query.query) {
    const parsed = JSON.parse(req.query.query);

    if (parsed.db) {
      const mockdb = loadMockDb();
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
