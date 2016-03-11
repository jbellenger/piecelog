import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className={styles.root}>
        <Link to="home">home</Link>
        <Link to="log">log</Link>
        <Link to="">log-by-person</Link>
        <Link to="">log-by-piece</Link>
        <Link to="">log-by-type</Link>
        <Link to="">custom</Link>
      </nav>
    );
  }
}
