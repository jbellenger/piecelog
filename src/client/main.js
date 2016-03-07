import { render } from 'react-dom';
import React from 'react';
import Router from './routes';
import { Provider } from 'react-redux';
import { initStore }  from './modules/store';
import mockstate from 'json!./mockstate.json';

console.log('API_HOST', API_HOST);

const store = initStore(mockstate);
const app = (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(app, document.getElementById('app'));
