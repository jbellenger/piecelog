import api from '.';
import lodash from 'lodash';
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
  };

  const args = lodash.merge({}, opts, defaulted);
  return api.get('/bootstrap', {query: JSON.stringify(args)});
};
