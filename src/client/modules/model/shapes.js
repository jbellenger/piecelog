import {PropTypes} from 'react';
import Workout from './Workout';

export const WorkoutShape = PropTypes.instanceOf(Workout);
export const WorkoutsShape = PropTypes.arrayOf(WorkoutShape);
