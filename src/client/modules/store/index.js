import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as dbReducer } from './db';
import { reducer as queryReducer } from './query';
import createLogger from 'redux-logger';

export function initStore(initialState = {}) {
  const reducers = combineReducers({
    db: dbReducer,
    query: queryReducer,
  });

  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: false
  });

  return createStore(reducers, initialState, applyMiddleware(logger));
}
