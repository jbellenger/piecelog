import React, {PropTypes} from 'react';
import Table from '../Table';
import groupBy from 'lodash/groupBy';

const GroupedTable = ({rows, groupKey, ...props}) => {
  const groupings = groupBy(rows, groupKey);
  const groupedRows = Object.keys(groupings).map((groupValue) => {
    const row = {group: groupings[groupValue]};
    row[groupKey] = groupValue;
    return row;
  });
  return <Table rows={groupedRows} {...props} />;
};

GroupedTable.propTypes = {
  groupKey: PropTypes.string.isRequired,
};

export default GroupedTable;
