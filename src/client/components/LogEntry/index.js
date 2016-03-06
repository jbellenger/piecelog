import React, { PropTypes } from 'react';
import styles from './styles.css';

export default class LogEntry extends React.Component {
  render() {
    return (
      <tr className={styles.row}>
        <td>{this.props.entry.name}</td>
        <td>{this.props.entry.piece}</td>
      </tr>
    );
  }
}

LogEntry.propTypes = {
  entry: PropTypes.object.isRequired
};
