import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as logReducer } from './log';
import { reducer as piecesReducer } from './pieces';
import { reducer as peopleReducer } from './people';
import createLogger from 'redux-logger';

export function initStore(initialState = {}) {
  const reducers = combineReducers({
    log: logReducer,
    pieces: piecesReducer,
    people: peopleReducer
  });

  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: false
  });

  return createStore(reducers, initialState, applyMiddleware(logger));
}
