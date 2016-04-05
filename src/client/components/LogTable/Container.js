import React, {PropTypes} from 'react';
import LogTable from './LogTable';
import * as Cols from './Cols';

export default class Container extends React.Component {
  onSort() {
    console.log('TODO: onSort');
  }

  static defaultProps = {
    colKeys: Cols._ALL_KEYS,
    sortData: {
      col: Cols.STAMP,
      desc: false,
      onSort: () => {}
    }
  };

  render() {
    const {sortData} = this.props;
    const _sortData = {
      onSort: this.onSort.bind(this),
      ...sortData
    };

    return (
      <LogTable {...this.props} sortData={_sortData} />
    );
  }
};
