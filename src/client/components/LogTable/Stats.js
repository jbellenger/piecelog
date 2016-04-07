import React, {PropTypes} from 'react';
import { LogRowsShape } from './shapes';

export default class Stats extends React.Component {
  static propTypes = {
    rows: LogRowsShape.isRequired,
  };

  render() {
    const {rows} = this.props;
    return (
      <div>LOG TABLE STATS: {rows.length}</div>
    );
  }
}

