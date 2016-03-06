import React, { PropTypes } from 'react';
import LogEntry from '../LogEntry';

export default class LogTable extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>piece</th>
          </tr>
          {this.props.entries.map((e, i) => <LogEntry entry={e} key={i}/>)}
        </tbody>
      </table>
    );
  }
}

LogTable.propTypes = {
  entries: PropTypes.array.isRequired
};
