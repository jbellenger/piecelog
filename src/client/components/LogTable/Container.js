import React, {PropTypes} from 'react';
import LogTable from './LogTable';
import * as Cols from './Cols';

export default class Container extends React.Component {
  static defaultProps = {
    cols: [
      Cols.PIECE,
      Cols.PERSON,
      Cols.STAMP,
      Cols.DISTANCE,
      Cols.TIME,
      Cols.POUNDS,
      Cols.KILOS,
      Cols.SPLIT,
      Cols.WATTS,
      Cols.WATTS_PER_KG,
      Cols.WEIGHT_ADJUSTED_SPLIT,
    ]
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
