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

export const EVENT_ID = new Field({
  key: 'id', 
  header: 'event id'
});

export const EVENT_STAMP = new Field({
  key: 'stamp', 
  header: 'date', 
  formatter: EVENT_STAMP_FORMAT
});

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const RESULT_PERSON_ID = new Field({
  key: 'person_id', 
  header: 'person', 
  formatter: PERSON_FORMAT
});

export const RESULT_WEIGHT_KILOS = new Field({
  key: 'weight_kilos', 
  header: 'kgs', 
  formatter: Format.formatWeight
});

export const RESULT_WEIGHT_POUNDS = new Field({
  key: 'weight_pounds', 
  header: 'lbs', 
  formatter: Format.formatWeight
});

export const EVENT_WORKOUT_ID = new Field({
  key: 'workout_id', 
  header: 'workout', 
  formatter: WORKOUT_ID_FORMAT
});

const aggFormat = (inner) => (x, i) => {
  const cls = i === 0 ? 'mean' : 'item';
  return <span className={cls}>{inner(x)}</span>;
};

export const RESULT_ENTRY_SPLIT = new Field({
  header: 'split', 
  formatter: aggFormat(Format.formatSplit),
  extractor: (x) => x.entry_collection.entries.map((e) => e.split_seconds)
});

export const RESULT_ENTRY_WATTS_PER_KG = new Field({
  header: 'watts/kg', 
  formatter: aggFormat(Format.formatWattsPerKg), 
  extractor: (x) => x.entry_collection.entries.map((e) => e.watts_per_kg)
});

export const RESULT_ENTRY_ADJUSTED_SPLIT = new Field({
  header: 'adjusted split',
  formatter: aggFormat(Format.formatSplit),
  extractor: (x) => x.entry_collection.entries.map((e) => e.weight_age_adjusted_split_seconds)
});
