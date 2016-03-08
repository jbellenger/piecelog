import request from 'superagent';

const get = (path, opts) => invoke('GET', path, opts);

const invoke = (method, path, opts) => {
  return new Promise((resolve, reject) => {
    request(method, API_HOST + '/api/1' + path)
      .query(opts)
      .end((err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp.body);
        }
      });
  });
};

export default { get };
