import React from 'react';
import {Link} from 'react-router';
import Field from '.';
import * as Format from '../format';

const EVENT_STAMP_FORMAT = (value) => (
  <Link to={`/event/${value}`}>{Format.formatStamp(value)}</Link>
);

const WORKOUT_ID_FORMAT = (value) => (
  <Link to={`/workout/${value}`}>{value}</Link>
);

export const EVENT_ID = new Field('event_id', 'event id');

export const EVENT_STAMP = new Field('event_stamp', 'date', EVENT_STAMP_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const RESULT_PERSON_ID = new Field('result_person_id', 'person', PERSON_FORMAT);

export const RESULT_WEIGHT_KILOS = new Field('result_weight_kilos', 'kgs', Format.formatWeight);

export const RESULT_WEIGHT_POUNDS = new Field('result_weight_pounds', 'lbs', Format.formatWeight);

export const RESULT_ENTRIES = new Field('result_entries', 'results', JSON.stringify);

export const RESULT_ENTRY = new Field('result_entries', 'result', JSON.stringify);

export const RESULT_ENTRY_SPLIT = new Field(null, 'split', null, (x) => 'TODO');

export const EVENT_WORKOUT_ID = new Field('event_workout_id', 'workout', WORKOUT_ID_FORMAT);
