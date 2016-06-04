import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className={styles.root}>
        <Link to="/home">home</Link>
        <Link to="/workout">workouts</Link>
        <Link to="/event">events</Link>
        <Link to="/person">people</Link>
      </nav>
    );
  }
}
