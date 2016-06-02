import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export default class Footer extends React.Component {
  render() {
    const {className} = this.props;

    return (
      <footer className={className}>
        <ul className={styles.root}>
          <li>
            <Link to="about">about</Link>
          </li>
          <li>
            <a target="_blank" href="https://www.github.com/jbellenger/piecelog">github</a>
          </li>
        </ul>
      </footer>
    );
  }
}
