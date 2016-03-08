import api from '.';

const loadBook = (opts = {}) => {
  const defaulted = {
    log: true,
    people: true,
    pieces: true,
    ...opts
  };
  return api.get('/book', defaulted);
}

export default { loadBook };
