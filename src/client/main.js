import { render } from 'react-dom';
import React from 'react';
import Router from './routes';
import { Provider } from 'react-redux';
import { initStore }  from './modules/store';

const store = initStore();
const app = (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(app, document.getElementById('app'));
