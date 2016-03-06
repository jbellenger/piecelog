// actions
export const INCREMENT = 'INCREMENT';
export const increment = (payload) => ({ payload, type: INCREMENT });

const initialState = {
  value: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload
      };

    default: return state;
  }
};
