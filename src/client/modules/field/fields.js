import React from 'react';
import {Link} from 'react-router';
import Field from '.';
import * as Format from '../format';
import MeanField from '../../components/ResultsTable/MeanField';

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

export const RESULT_ENTRY_SPLIT = new Field(
  'entry_collection', 
  'split', 
  Format.formatSplit, 
  (x) => x.entry_collection.entries.map((e) => e.split_seconds)
);

export const RESULT_ENTRY_WATTS_PER_KG = new Field(
  'entry_collection', 
  'watts/kg', 
  Format.formatWattsPerKg, 
  (x) => x.entry_collection.entries.map((e) => e.watts_per_kg)
);

export const EVENT_WORKOUT_ID = new Field('workout_id', 'workout', WORKOUT_ID_FORMAT);
