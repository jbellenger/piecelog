import api from '.';
import lodash from 'lodash';
import * as Queries from '../query';
import LogEvent from '../model/LogEvent';
import Person from '../model/Person';
import Piece from '../model/Piece';

export const bootstrap = (opts = {}) => {
  const defaulted = {
    db: {
      log: true,
      person: true,
      piece: true,
      workouts: true,
      results: true,
      events: true,
    },
    queries: {
      [Queries.ALL_LOG_QUERY]: true,
    }
  };

  const args = lodash.merge({}, opts, defaulted);
  return api.get('/bootstrap', {query: JSON.stringify(args)});
};
