import React from 'react';
import WorkoutView from './WorkoutView';

export default ({params: {workoutId}}) => (
  <WorkoutView workoutId={workoutId} />
);
