const initialState = {
  all: [],
  view: [],
  filter: null
};

export const rowFilter = (query) => {
  if (!query) {
    return () => true;
  }
  const fields = ['name', 'piece', 'distance_meters'];
  return row => fields.some(field => {
    if (row[field] === undefined) {
      return false;
    }
    const value = String(row[field]).toLowerCase();
    return value.indexOf(query) !== -1;
  });
};

// reducer decorator
export const filtered = fn => (...args) => {
  const state = fn(...args);
  return {
    ...state,
    view: state.all.filter(rowFilter(state.filter))
  };
};

export const reducer = filtered((state, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      // state may be partially initialied. Spread to fill in defaults for
      // missing values
      return {...initialState, ...state};
  }
});


const SET_FILTER = 'SET_FILTER';
export const setFilter = (params) => {
  return {type: SET_FILTER, payload: params};
};
