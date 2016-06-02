import api from '.';
import merge from 'lodash/merge';
import Person from '../model/Person';

export const bootstrap = (opts = {}) => {
  const defaulted = {
    db: {
      log: true,
      person: true,
      workouts: true,
      results: true,
      events: true,
    },
  };

  const args = merge({}, opts, defaulted);
  return api.get('/bootstrap', {query: JSON.stringify(args)});
};
