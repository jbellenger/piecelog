import React from 'react';
import styles from './styles.css';

export default ({query, error}) => (
  <div className={styles.root}>
    <span className={styles.query}>{query}</span>
    {error && <pre className={styles.error}>{error.stack}</pre>}
    {error && console.error(error)}
  </div>
);
