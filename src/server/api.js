import { Router } from 'express';

export const middleware = Router();

middleware.get('/1/log', (req, res) => {
  res.json({msg: 'test'});
});
