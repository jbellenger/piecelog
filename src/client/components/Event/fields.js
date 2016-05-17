import React from 'react';
import {Link} from 'react-router';
import Field from '../../modules/field';
import * as Format from '../../modules/format';

export const EVENT_ID = new Field('event_id', 'event id');

const EVENT_STAMP_FORMAT = (value) => (
  <Link to={`/event/${value}`}>{Format.formatStamp(value)}</Link>
);
export const EVENT_STAMP = new Field('event_stamp', 'date', EVENT_STAMP_FORMAT);
