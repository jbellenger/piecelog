export const ADD_ENTRIES = 'ADD_ENTRIES';
export const addEntries = (payload) => ({payload, type: ADD_ENTRIES});

const initialState = {
  entries: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ENTRIES:
      return {
        entries: state.entries.concat(action.payload),
        ...state
      };

    default:
      return state;
  }
}
