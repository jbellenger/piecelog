import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import Table from '../Table';
import * as WorkoutFields from './fields';

const WorkoutIndexView = ({workouts}) => (
  <div>
    <h1>Workouts</h1>
    <Table 
      rows={workouts} 
      fields={[
        WorkoutFields.ID
      ]}
    />
  </div>
);

export const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  return {
    workouts: models.workouts.workouts
  };
};

export default connect(mapStateToProps)(WorkoutIndexView);
