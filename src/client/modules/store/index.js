import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { reducer as counterReducer } from './counter';
import { reducer as logReducer } from './log';
import createLogger from 'redux-logger';

export function initStore(initialState = {}) {
  const reducers = combineReducers({
    count: counterReducer,
    log: logReducer,
  });

  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: false
  });

  return createStore(reducers, initialState, applyMiddleware(logger));
}
