import Field from '../../modules/field';
import * as Format from '../../modules/format';

export const WORKOUT_ID = new Field({
  key: 'workout_id',
  formatter: Format.formatWorkout,
});
