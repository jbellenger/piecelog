import React, { PropTypes } from 'react';
import * as Shapes from './shapes';

export default class Row extends React.Component {
  static propTypes = {
    row: Shapes.RowShape.isRequired,
    fields: Shapes.FieldsShape.isRequired,
  };

  render() {
    const {fields, row} = this.props;

    return (
      <tr>
        {fields.map((field,i) => <td key={i}>{field.apply(row)}</td>)}
      </tr>
    );
  }
}
