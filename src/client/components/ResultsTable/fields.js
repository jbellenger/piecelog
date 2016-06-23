import React from 'react';
import Field from '../../modules/field';
import * as Format from '../../modules/format';

export const PERSON_ID = new Field({
  key: 'person_id', 
  header: 'person', 
  formatter: Format.formatPerson,
});

export const STAMP = new Field({
  key: 'stamp', 
  header: 'date', 
  formatter: Format.formatStamp,
});

export const WEIGHT_KILOS = new Field({
  key: 'weight_kilos', 
  header: 'kgs', 
  formatter: Format.formatWeight
});

export const WEIGHT_POUNDS = new Field({
  key: 'weight_pounds', 
  header: 'lbs', 
  formatter: Format.formatWeight
});

export const WORKOUT_ID = new Field({
  key: 'workout_id', 
  header: 'workout', 
  formatter: Format.formatWorkout,
});

const aggFormat = (inner) => (x, i) => {
  const cls = i === 0 ? 'mean' : 'item';
  return <span className={cls}>{inner(x)}</span>;
};

const extractorWithMean = (fieldName) => (result) => {
  const coll = result.entry_collection;
  const means = coll.entries.length > 1 ? [coll.mean] : [];
  return means.concat(coll.entries)
    .map((e) => e[fieldName]);
}

export const MEAN_SPLIT = new Field({
  header: 'mean split',
  formatter: Format.formatSplit,
  extractor: (r) => r.entry_collection.mean.split_seconds,
});

// JMB TODO: find a better way to do these ENTRY_* fields
export const ENTRY_SPLIT = new Field({
  header: 'split', 
  formatter: aggFormat(Format.formatSplit),
  extractor: extractorWithMean('split_seconds'),
});

export const ENTRY_WATTS_PER_KG = new Field({
  header: 'watts/kg', 
  formatter: aggFormat(Format.formatWattsPerKg), 
  extractor: extractorWithMean('watts_per_kg'),
});

export const ENTRY_ADJUSTED_SPLIT = new Field({
  header: 'adjusted split',
  formatter: aggFormat(Format.formatSplit),
  extractor: extractorWithMean('weight_age_adjusted_split_seconds'),
});

export const ResultEntryFields = {
  SPLIT: new Field({
    header: 'split',
    formatter: Format.formatSplit,
    extractor: (e) => e.split_seconds,
  }),
  STAMP: new Field({
    header: 'date', 
    formatter: Format.formatStamp,
    extractor: (e) => e.result.stamp,
  }),
};
