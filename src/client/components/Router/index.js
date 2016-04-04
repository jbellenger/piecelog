import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from '../Page';
import About from '../About';
import Home from '../Home';
import LogRoute from '../Log/Route';
import QueryEditorPage from '../QueryEditor/Page';
import PersonRoute from '../Person/Route';
import PieceRoute from '../Piece/Route';

export default class PageRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
          <Route path="log" component={LogRoute} />
          <Route path="query" component={QueryEditorPage} />
          <Route path="person/:personId" component={PersonRoute} />
          <Route path="piece/:pieceId" component={PieceRoute} />
        </Route>
      </Router>
    );
  }
}
