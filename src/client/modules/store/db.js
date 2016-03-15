import Database from '../db';

const INSTALL = 'DB_INSTALL';

export const install = (data) => {
  return {type: INSTALL, payload: data};
};

export const reducer = (state, action) => {
  switch (action.type) {
    case INSTALL: 
      return {
        ...state,
        db: new Database().install(action.payload)
      };

    default:
      return {
        ...state,
        db: new Database()
      };
  }
};
