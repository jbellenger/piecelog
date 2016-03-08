import api from '.';

const loadBook = () => api.get('/book');

export default { loadBook };
