import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from '../Page';
import About from '../About';
import Home from '../Home';
import LogRoute from '../Log/Route';
import QueryEditorPage from '../QueryEditor/Page';
import PersonRoute from '../Person/Route';
import PieceRoute from '../Piece/Route';
import PieceTypeRoute from '../PieceType/Route';
import WorkoutRoute from '../Workout/Route';
import SvgTest from '../SvgTest/Route';

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
          <Route path="svg" component={SvgTest} />
          <Route path="person/:personId" component={PersonRoute} />
          <Route path="piece/:pieceId" component={PieceRoute} />
          <Route path="piece-type/:pieceType" component={PieceTypeRoute} />
          <Route path="workout/:workoutId" component={WorkoutRoute} />
        </Route>
      </Router>
    );
  }
}
