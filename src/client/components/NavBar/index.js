import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Link to="home">home</Link>
        <Link to="log">log</Link>
        <Link to="about">about</Link>
      </div>
    );
  }
}
