import React from 'react';
import { Link } from 'react-router';
import TopNav from '../TopNav';
import Footer from '../Footer';
import styles from './styles.css';

export default class Page extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <TopNav className={styles.top}/>
        <div className={styles.main}>
          {this.props.children}
        </div>
        <Footer className={styles.bottom}/>
      </div>
    );
  }
}
