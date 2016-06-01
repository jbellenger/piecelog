import React from 'react';
import {Link} from 'react-router';
import Field from '.';
import * as Format from '../format';

export const EVENT_ID = new Field({
  key: 'id', 
  header: 'event id'
});

export const EVENT_STAMP = new Field({
  key: 'stamp', 
  header: 'date', 
  formatter: Format.formatEvent,
});
