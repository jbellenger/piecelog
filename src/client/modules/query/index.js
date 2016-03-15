// Alasql doesn't work well with webpack since alasql uses "exports" to
// detected whether or not it's in node.js or the browser

import alasql from 'alasql';

export const parse = (query) => {
  try {
    return alasql(query);
  } catch (err) {
    return null;
  }
};
