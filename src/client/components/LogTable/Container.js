import React, {PropTypes} from 'react';
import LogTable from './LogTable';
import * as LogTableFields from '../../modules/field/LogTableFields';

export default class Container extends React.Component {
  static defaultProps = {
    fields: [
      LogTableFields.PIECE,
      LogTableFields.PERSON,
      LogTableFields.STAMP,
      LogTableFields.DISTANCE,
      LogTableFields.TIME,
      LogTableFields.POUNDS,
      LogTableFields.SPLIT,
      LogTableFields.WATTS,
      LogTableFields.WATTS_PER_KG,
      LogTableFields.WEIGHT_ADJUSTED_SPLIT,
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      field: LogTableFields.STAMP,
      desc: false
    };
  }

  onSort(field) {
    if (field === this.state.field) {
      this.setState({desc: !this.state.desc});
    } else {
      this.setState({field});
    }
  }

  get sortData() {
    return {
      field: this.state.field,
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
