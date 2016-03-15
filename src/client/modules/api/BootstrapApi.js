import api from '.';
import lodash from 'lodash';
import * as Queries from '../query';

export const bootstrap = (opts = {}) => {
  const defaulted = {
    db: {
      log: true,
      people: true,
      pieces: true,
    },
    queries: {
      [Queries.ALL_LOG_QUERY]: true,
    }
  };

  const args = lodash.merge({}, opts, defaulted);
  return api.get('/bootstrap', {query: JSON.stringify(args)});
};
