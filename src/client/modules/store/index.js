import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as queryReducer } from './query';
import { reducer as modelsReducer } from './models';
import createLogger from 'redux-logger';

export function initStore(initialState = {}) {
  const reducers = combineReducers({
    models: modelsReducer,
    query: queryReducer,
  });

  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: false
  });

  return createStore(reducers, initialState, applyMiddleware(logger));
}
