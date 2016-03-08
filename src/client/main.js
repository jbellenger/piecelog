import { render } from 'react-dom';
import React from 'react';
import Router from './routes';
import { Provider } from 'react-redux';
import { initStore }  from './modules/store';
import BookApi from './modules/api/BookApi';
import styles from './styles.css';

BookApi.loadBook()
  .then(book => {
    const store = initStore(book);
    const app = (
      <Provider store={store}>
        <Router />
      </Provider>
    );

    render(app, document.getElementById('app'));
  });

