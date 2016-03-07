import { Router } from 'express';
import mockstate from 'json!./mockstate.json';

export const middleware = Router();

middleware.get('/1/log', (req, res) => {
  res.json(mockstate.log);
});

middleware.get('/1/people', (req, res) => {
  res.json(mockstate.people);
});

middleware.get('/1/pieces', (req, res) => {
  res.json(mockstate.pieces);
});
