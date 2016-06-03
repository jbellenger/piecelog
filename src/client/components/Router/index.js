import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Page from '../Page';
import About from '../About';
import Home from '../Home';
import PersonRoute from '../Person/PersonRoute';
import WorkoutRoute from '../Workout/WorkoutRoute';
import WorkoutIndexView from '../Workout/WorkoutIndexView';
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
          <Route path="svg" component={SvgTest} />
          <Route path="person/:personId" component={PersonRoute} />
          <Route path="workout">
            <IndexRoute component={WorkoutIndexView} />
            <Route path=":workoutId" component={WorkoutRoute} />
          </Route>

          <Route path="event/:eventId" component={EventRoute} />
        </Route>
      </Router>
    );
  }
}
