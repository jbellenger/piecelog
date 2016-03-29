import Models from '../model/Models';

const INSTALL = 'MODELS_INSTALL';

export const selector = (state) => state.models;

export const install = (data) => {
  return {type: INSTALL, payload: data};
};

export const reducer = (state = new Models(), action) => {
  switch (action.type) {
    case INSTALL: 
      return new Models().install(action.payload);

    default:
      return state;
  }
};
