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

export const EVENT_ID = new Field('id', 'event id');

export const EVENT_STAMP = new Field('stamp', 'date', EVENT_STAMP_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const RESULT_PERSON_ID = new Field('person_id', 'person', PERSON_FORMAT);

export const RESULT_WEIGHT_KILOS = new Field('weight_kilos', 'kgs', Format.formatWeight);

export const RESULT_WEIGHT_POUNDS = new Field('weight_pounds', 'lbs', Format.formatWeight);

export const RESULT_ENTRIES = new Field('entries', 'results', JSON.stringify);

export const RESULT_ENTRY = new Field('entries', 'result', JSON.stringify);

const resultEntryFormat = (coll) => {
  return Format.formatSplit(coll.mean_split_seconds);
};
export const RESULT_ENTRY_SPLIT = new Field('entry_collection', 'split', resultEntryFormat);

export const EVENT_WORKOUT_ID = new Field('workout_id', 'workout', WORKOUT_ID_FORMAT);
