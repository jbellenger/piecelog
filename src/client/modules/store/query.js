const INSTALL = 'QUERY_INSTALL';

export const install = (data) => {
  return {type: INSTALL, payload: data};
};

export const reducer = (state, action) => {
  switch (action.type) {
    case INSTALL: 
      return { ...state, ...action.payload };

    default:
      return {...state};
  }
};
