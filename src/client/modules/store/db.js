import Database from '../db';

const INSTALL = 'DB_INSTALL';

export const install = (data) => {
  return {type: INSTALL, payload: data};
};

export const reducer = (state = new Database(), action) => {
  switch (action.type) {
    case INSTALL: 
      return new Database().install(action.payload);

    default:
      return state;
  }
};
