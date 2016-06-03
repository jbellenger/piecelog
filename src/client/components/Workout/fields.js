import React from 'react';
import Field from '../../modules/field';
import * as Format from '../../modules/format';

export const ID = new Field({
  key: 'id',
  formatter: Format.formatWorkout
});
