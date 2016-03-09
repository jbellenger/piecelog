import { render } from 'react-dom';
import React from 'react';
import Router from './components/Router';
import { Provider } from 'react-redux';
import { initStore }  from './modules/store';
import * as LogStore from './modules/store/log';
import BookApi from './modules/api/BookApi';
import styles from './styles.css';

BookApi.bootstrap()
  .then(boot => {
    // munge bootstrap data to match the shape of the store
    const initialState = {
      ...boot,
      log: {
        all: boot.log
      }
    };

    const store = initStore(initialState);
    const app = (
      <Provider store={store}>
        <Router />
      </Provider>
    );

    render(app, document.getElementById('app'));
  });

