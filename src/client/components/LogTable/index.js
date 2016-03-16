import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import defaultStyles from 'fixed-data-table/dist/fixed-data-table.css';
import styles from './styles.css';
import FlexSizing from '../FlexSizing';

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

class LogTable extends React.Component {
  render() {
    console.log('LogTable render', this.props);

    const { rows, height, width } = this.props;
    const columnDefaults = {
      align: 'left',
      allowCellsRecycling: true,
      width: 100,
    };

    return (
      <Table
          className={styles.root}
          rowHeight={40}
          rowsCount={rows.length}
          headerHeight={50}
          width={width}
          height={height}>
        <Column 
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
            {...columnDefaults}
            header={<Cell>Piece</Cell>}
            flexGrow={1}
            fixed={true}
            cell={
              props => (
                <Cell {...props}>
                  {rows[props.rowIndex].piece}
                </Cell>
              )
            }/>
        <Column 
            {...columnDefaults}
            header={<Cell>Time</Cell>}
            cell={
              props => <DurationCell data={rows} col="time_millis" {...props} />
            }/>
        <Column 
            {...columnDefaults}
            header={<Cell>Stamp</Cell>}
            cell={
              props => <TextCell data={rows} col="stamp" {...props} />
            } />
        <Column 
            {...columnDefaults}
            header={<Cell>Meters</Cell>}
            cell={
              props => <TextCell data={rows} col="distance_meters" {...props} />
            } />
        <Column 
            {...columnDefaults}
            header={<Cell>Kilos</Cell>}
            cell={
              props => <TextCell data={rows} col="weight_kilos" {...props} />
            } />
        <Column 
            {...columnDefaults}
            header={<Cell>Age</Cell>}
            cell={
              props => <TextCell data={rows} col="age" {...props} />
            } />
      </Table>
    );
  }
}

LogTable.propTypes = {
  rows: PropTypes.array.isRequired
};

export default FlexSizing(LogTable);
