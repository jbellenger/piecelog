import api from '.';

export const bootstrap = (opts = {}) => {
  const defaulted = {
    log: true,
    people: true,
    pieces: true,
    ...opts
  };
  return api.get('/bootstrap', defaulted);
};

// export default { bootstrap };
