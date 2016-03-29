import { render } from 'react-dom';
import React from 'react';
import Router from './components/Router';
import { Provider } from 'react-redux';
import { initStore }  from './modules/store';
import { bootstrap } from './modules/api/BootstrapApi';
import * as ModelStore from './modules/store/models';
import * as QueryStore from './modules/store/query';
import styles from './styles.css';

bootstrap()
  .then(({db, queries}) => {
    const store = initStore();
    store.dispatch(ModelStore.install(db));
    store.dispatch(QueryStore.install(queries));

    const app = (
      <Provider store={store}>
        <Router />
      </Provider>
    );

    render(app, document.getElementById('app'));
  });

