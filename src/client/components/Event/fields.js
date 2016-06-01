import Field from '../../modules/field';
import * as Format from '../../modules/format';

export const ID = new Field({
  key: 'id',
  formatter: Format.formatEvent,
});

export const STAMP = new Field({
  key: 'stamp',
  formatter: Format.formatStamp,
});

export const WORKOUT_ID = new Field({
  key: 'workout_id',
  formatter: Format.formatWorkout,
});
