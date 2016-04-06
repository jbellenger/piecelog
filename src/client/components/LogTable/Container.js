import React, {PropTypes} from 'react';
import LogTable from './LogTable';
import * as Cols from './Cols';

export default class Container extends React.Component {
  static defaultProps = {
    colKeys: Cols._ALL_KEYS,
  };

  constructor(props) {
    super(props);
    this.state = {
      col: Cols.STAMP,
      desc: false
    };
  }

  onSort(col) {
    if (col === this.state.col) {
      this.setState({desc: !this.state.desc});
    } else {
      this.setState({col});
    }
  }

  get sortData() {
    return {
      col: this.state.col,
      desc: this.state.desc,
      onSort: this.onSort.bind(this),
    };
  }

  render() {
    return (
      <LogTable {...this.props} sortData={this.sortData} />
    );
  }
};
