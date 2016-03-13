import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from '../Page';
import About from '../../containers/About';
import Home from '../../containers/Home';
import LogTableContainer from '../../containers/LogTableContainer';
import QueryEditorPage from '../../components/QueryEditor/Page';

export default class PageRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
          <Route path="log" component={LogTableContainer} />
          <Route path="query" component={QueryEditorPage} />
        </Route>
      </Router>
    );
  }
}
