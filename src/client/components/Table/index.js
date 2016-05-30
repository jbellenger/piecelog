import React, {PropTypes} from 'react';
import Headers from './Headers';
import styles from './styles.css';
import * as Shapes from './shapes';
import classNames from 'classnames';
import range from 'lodash/range';
import castArray from 'lodash/castArray';
import flatMap from 'lodash/flatMap';
import orderBy from 'lodash/orderBy';

// Drawing strategy:
//   - when drawing a row, don't draw cells for undefined values
//   - when drawing a cell, if cell in r+1 is undefined, assume that it should
//     fill remaining rows
//     - rowspan = table.length - r
//     - otherwise, use rowspan = 1

const renderRow = (table, fields, r) => {
  const cells = range(table[r].length)
    .map((c) => renderCell(table, fields, r, c))
    .filter(Boolean);
  return <tr>{cells}</tr>
};

const renderCell = (table, fields, r, c) => {
  const data = table[r][c];
  if (data) {
    const fill = r+1 < table.length ? !table[r+1][c] : false
    const rowspan = fill ? table.length - r : 1;
    const formatted = fields[c].formatter(data, r);
    return <td rowSpan={rowspan}>{formatted}</td>;
  }
}

const expandRow = (row, fields) => {
  const data = fields.map((field) => ({
    field,
    values: castArray(field.extractor(row)),
  }));

  const totalTableRows = Math.max(...data.map((c) => c.values.length));

  const table = [];
  // each row can be expanded to a 2-d table
  for (let r=0; r < totalTableRows; r++) {
    const row = [];
    for (let c=0; c < fields.length; c++) {
      row.push(data[c].values[r]);
    }
    table.push(row);
  }
  return table;
};

const trs = (row, fields) => {
  const table = expandRow(row, fields);
  return range(table.length).map((r) => renderRow(table, fields, r));
};

export default class Table extends React.Component {
  static propTypes = {
    rows: Shapes.RowsShape.isRequired,
    fields: Shapes.FieldsShape.isRequied,
    sortField: Shapes.FieldShape,
  };

  constructor(props) {
    super(props);
    const {sortField, sortDesc = false} = props;
    this.state = {sortField, sortDesc};
  }

  onSort(sortField) {
    if (sortField === this.state.sortField) {
      this.setState({sortDesc: !this.state.sortDesc});
    } else {
      this.setState({sortField});
    }
  }

  render() {
    const {rows, fields, className} = this.props;
    const {sortField, sortDesc} = this.state;

    const cnames = classNames(className, styles.root);
    let onSort;
    if (sortField) {
      onSort = this.onSort.bind(this);
    }

    let sortedRows = rows;
    if (sortField) {
      sortedRows = orderBy(rows, (row) => (
        castArray(sortField.extractor(row))[0]
      ), [sortDesc && 'desc' || 'asc']);
    }

    return (
      <table className={cnames}>
        <tbody>
          <Headers 
            fields={fields} 
            sortField={sortField} 
            sortDesc={sortDesc} 
            onSort={onSort}
          />
          {flatMap(sortedRows, (row) => trs(row, fields))}
        </tbody>
      </table>
    );
  }
}
