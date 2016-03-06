import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import * as styles from 'fixed-data-table/dist/fixed-data-table.css';

export const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

export const DurationCell = ({rowIndex, data, col, ...props}) => {
  const millis = data[rowIndex][col];

  return (
    <Cell {...props}>
      {millis}
    </Cell>
  );
};

export default class LogTable extends React.Component {
  render() {
    const { rows } = this.props;

    return (
      <Table
          rowHeight={40}
          rowsCount={rows.length}
          headerHeight={50}
          width={500}
          maxHeight={400}>
        <Column 
            align='left'
            header={<Cell>Name</Cell>}
            flexGrow={1}
            fixed={true}
            cell={
              props => (
                <TextCell data={rows} col="name" {...props} />
              )
            }
            width={50} />

        <Column 
            align='left'
            header={<Cell>Piece</Cell>}
            flexGrow={1}
            fixed={true}
            cell={
              props => (
                <Cell {...props}>
                  {rows[props.rowIndex].piece}
                </Cell>
              )
            }
            width={50} />
        <Column 
            align='left'
            header={<Cell>Time</Cell>}
            cell={
              props => <DurationCell data={rows} col="time_millis" {...props} />
            }
            width={50} />
        <Column 
            align='left'
            header={<Cell>Stamp</Cell>}
            cell={
              props => <TextCell data={rows} col="stamp" {...props} />
            }
            width={50} />
        <Column 
            align='left'
            header={<Cell>Meters</Cell>}
            cell={
              props => <TextCell data={rows} col="distance_meters" {...props} />
            }
            width={50} />
        <Column 
            align='left'
            header={<Cell>Kilos</Cell>}
            cell={
              props => <TextCell data={rows} col="weight_kilos" {...props} />
            }
            width={50} />
        <Column 
            align='left'
            header={<Cell>Age</Cell>}
            cell={
              props => <TextCell data={rows} col="age" {...props} />
            }
            width={50} />
      </Table>
    );
  }
}

LogTable.propTypes = {
  rows: PropTypes.array.isRequired
};
