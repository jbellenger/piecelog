import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as Shapes from './shapes';

const TableHeader = ({key, field, sortData}) => {
  let contents = field.header;
  if (sortData && field === sortData.field) {
    contents += sortData.desc ? '↓' : '↑';
  }
  const attrs = {key};
  if (sortData) {
    attrs.onClick = () => sortData.onSort(field);
  }

  return (
    <th {...attrs}>
      {contents}
    </th>
  );
};

export default class Headers extends React.Component {
  static propTypes = {
    fields: Shapes.FieldsShape.isRequired,
    sortData: Shapes.SortDataShape,
  };

  render() {
    const {fields} = this.props;
    return (
      <tr>
        {fields.map((field, i) => <TableHeader key={i} field={field} {...this.props} />)}
      </tr>
    );
  }
}
