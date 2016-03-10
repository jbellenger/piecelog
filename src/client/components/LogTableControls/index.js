import React from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';
import { setFilter } from '../../modules/store/log';

const mapStateToProps = (state) => Object();

export class Component extends React.Component {
  render() {
    const onFilterChange = (...args) => this._onFilterChange(...args);
    return (
      <div className={styles.root}>
        <input className={styles.filter} placeholder="filter" type='text' default='filter' 
          onChange={onFilterChange} />
      </div>
    );
  }

  _onFilterChange(e) {
    this.props.setFilter(e.target.value);
  }
}

export default connect(mapStateToProps, { setFilter })(Component);
