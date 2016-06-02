import api from '.';
import lodash from 'lodash';
import Person from '../model/Person';

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
