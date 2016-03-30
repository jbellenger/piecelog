import React from 'react';
import InputField from './InputField';
import Sidebar from './Sidebar';
import LogTable from '../LogTable';
import styles from './styles.css';
import { connect } from 'react-redux';
import { selector as modelsSelector } from '../../modules/store/models';

class Page extends React.Component {
  _onChange(queryString) {
    const query = queryString.trim();
    const state = { query, error: null, result: null };

    const { models } = this.props;

    try {
      state.result = models.exec(query);
      console.table(state.result);
    } catch (err) {
      state.error = err;
    }

    this.setState(state);
  }

  render() {
    const { result, error, query } = (this.state || {});
      
    return (
      <div className={styles.Page}>
        <Sidebar onQueryClick={this._onChange.bind(this)}/>
        <div className={styles.Content}>
          <InputField text={query} onChange={this._onChange.bind(this)} />
          {error && (
            <div className={styles.error}>{error.message}</div>
          )}
          {result && (
            <div className={styles.preview}>
              <LogTable rows={result} />
            </div>
          )}
          {(!error && !result) && (
            <div className={styles.zool} />
          )}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  models: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {models: modelsSelector(state)};
};

export default connect(mapStateToProps)(Page);
