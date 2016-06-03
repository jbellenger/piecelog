import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import Table from '../Table';
import * as EventFields from './fields';

const WorkoutIndexView = ({events}) => (
  <div>
    <h1>Events</h1>
    <Table 
      rows={events} 
      fields={[
        EventFields.ID,
        EventFields.STAMP,
        EventFields.WORKOUT_ID,
      ]}
      sortField={EventFields.STAMP}
      sortDesc={true}
    />
  </div>
);

export const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  return {
    events: models.events.events
  };
};

export default connect(mapStateToProps)(WorkoutIndexView);
