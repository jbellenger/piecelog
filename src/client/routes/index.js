import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../containers/App';
import About from '../containers/About';
import Home from '../containers/Home';
import CounterContainer from '../containers/CounterContainer';
import LogTableContainer from '../containers/LogTableContainer';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
          <Route path="counter" component={CounterContainer} />
          <Route path="log" component={LogTableContainer} />
        </Route>
      </Router>
    );
  }
}
