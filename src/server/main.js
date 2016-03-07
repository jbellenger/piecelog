import Express from 'express';
import { middleware as ApiMiddleware } from './api';

const app = Express();

app.use('/api', ApiMiddleware);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`api server listening on port ${port}`);
});
