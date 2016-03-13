import React from 'react';
import InputField from './InputField';
import Sidebar from './Sidebar';
import LogTable from '../LogTable';
import styles from './styles.css';
import * as query from '../../modules/query';

export default class Page extends React.Component {
  _onChange(queryString) {
    console.log('onChange', queryString);
    console.log(query.parse(queryString));
  }

  render() {
    return (
      <div className={styles.Page}>
        <Sidebar />
        <div className={styles.Content}>
          <InputField onChange={this._onChange} />
          <LogTable rows={[]} />
        </div>
      </div>
    );
  }
}
