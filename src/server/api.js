import { Router } from 'express';
import cors from 'cors';
import mockstate from 'json!./mockstate.json';

export const middleware = Router();
middleware.use(cors());

// TODO: endpoint should support queryable fields
middleware.get('/1/book', (req, res) => {
  res.json(mockstate);
});
