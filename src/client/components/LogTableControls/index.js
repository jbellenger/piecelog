import React from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';

export default class Component extends React.Component {
  render() {
    const onFilterChange = (...args) => this._onFilterChange(...args);
    return (
      <aside className={styles.root}>
        <input className={styles.filter} placeholder="filter" type='text' default='filter' 
          onChange={onFilterChange} />
      </aside>
    );
  }

  _onFilterChange(e) {
    console.error('NOT IMPLEMENTED: setFilter', e.target.value);
  }
}
