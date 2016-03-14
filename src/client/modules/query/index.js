// Alasql doesn't work well with webpack since alasql uses "exports" to
// detected whether or not it's in node.js or the browser

export const parse = (query) => {
  return alasql(query);
};
