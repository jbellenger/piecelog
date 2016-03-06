export const ADD_ENTRIES = 'ADD_ENTRIES';
export const addEntries = (payload) => ({payload, type: ADD_ENTRIES});

const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ENTRIES:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
