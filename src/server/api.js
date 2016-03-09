import { Router } from 'express';
import cors from 'cors';
import mockstate from 'json!./mockstate.json';

export const middleware = Router();
middleware.use(cors());

middleware.get('/1/bootstrap', (req, res) => {
  const { log, people, pieces } = req.query;
  const data = {};
  if (log === 'true') {
    data.log = mockstate.log;
  }
  if (people === 'true') {
    data.people = mockstate.people;
  }
  if (pieces === 'true') {
    data.pieces = mockstate.pieces;
  }
  res.json(data);
});
