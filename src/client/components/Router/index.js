import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from '../Page';
import About from '../About';
import Home from '../Home';
import LogRoute from '../Log/Route';
import PersonRoute from '../Person/PersonRoute';
import PieceRoute from '../Piece/Route';
import PieceTypeRoute from '../PieceType/Route';
import WorkoutRoute from '../Workout/WorkoutRoute';
import EventRoute from '../Event/EventRoute';
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
          <Route path="svg" component={SvgTest} />
          <Route path="person/:personId" component={PersonRoute} />
          <Route path="piece/:pieceId" component={PieceRoute} />
          <Route path="piece-type/:pieceType" component={PieceTypeRoute} />
          <Route path="workout/:workoutId" component={WorkoutRoute} />
          <Route path="event/:eventId" component={EventRoute} />
        </Route>
      </Router>
    );
  }
}
