import React, { PropTypes } from 'react';
import castArray from 'lodash/castArray';
import flatMap from 'lodash/flatMap';
import * as Shapes from './shapes';
import fill from 'lodash/fill';

export default class Row extends React.Component {
  static propTypes = {
    row: Shapes.RowShape.isRequired,
    fields: Shapes.FieldsShape.isRequired,
  };

  render() {
    const {fields, row} = this.props;

    // JMB TODO: 
    const data = fields.map((field) => ({
      field,
      values: castArray(field.extractor(row)),
    }));

    const totalTableRows = Math.max(...data.map((c) => c.values.length));

    // each row can be expanded to a 2-d table
    const table = fill(Array(totalTableRows), Array(fields.length));
    for (let r=0; r < totalTableRows; r++) {
      for (let c=0; c < fields.length; c++) {
        table[r][c] = data[c].values[r];
      }
    }

    console.log('table', table);

    return null;
    /*
    const maxColLength = Math.max(...cols.map((c) => c.values.length));

    return (
      <tr>
        {flatMap(cols, (col) => col.values.map((value) => (
          <td rowSpan={maxColLength - col.values.length + 1}>
            {col.field.formatter(value)}
          </td>
        )))}
      </tr>
    );
    */
  }
}
