import React from 'react';
import styles from './styles.css';

const ExampleQuery = ({onClick, label, query}) => (
  <li>
    <div onClick={() => onClick(query)} className={styles.ExampleQuery}>{label}</div>
  </li>
);

ExampleQuery.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  query: React.PropTypes.string.isRequired
};

export default ExampleQuery;
