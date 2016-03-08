import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <ul className={styles.root}>
          <li>
            <Link to="about">about</Link>
          </li>
          <li>
            <a href="https://www.github.com/jbellenger/piecelog">github</a>
          </li>
        </ul>
      </footer>
    );
  }
}
