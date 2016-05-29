import React from 'react';
import {Link} from 'react-router';
import Field from '.';
import * as Format from '../format';
import orderBy from 'lodash/orderBy';
import * as stats from '../stats';

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = new Field({
  key: 'log_piece_id', 
  header: 'piece', 
  foramtter: PIECE_FORMAT
});

const PIECE_TYPE_FORMAT = (value) => (
  <Link to={'/piece-type/' + value}>{value}</Link>
);
export const PIECE_TYPE = new Field({
  key: 'piece_type', 
  header: 'piece type', 
  formatter: PIECE_TYPE_FORMAT
});

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = new Field({
  key: 'log_person_id', 
  header: 'person', 
  formatter: PERSON_FORMAT
});

export const STAMP = new Field({
  key: 'log_stamp', 
  formatter: Format.formatStamp
});

export const DISTANCE = new Field({key: 'log_distance_meters', header: 'distance'});

export const TIME = new Field({key: 'log_time_millis', header: 'time', formatter: Format.formatTime});

export const POUNDS = new Field({key: 'log_weight_pounds', header: 'pounds', formatter: Format.formatWeight});

export const KILOS = new Field({key: 'log_weight_kilos', header: 'kilos', formatter: Format.formatWeight});

export const SPLIT = new Field({key: 'log_split_seconds', header: 'split', formatter: Format.formatSplit});

export const WATTS = new Field({key: 'log_watts', header: 'watts', formatter: Format.formatWatts});

export const WATTS_PER_KG = new Field({key: 'log_watts_per_kg', header: 'watts/kg', formatter: Format.formatWattsPerKg});

export const WEIGHT_ADJUSTED_SPLIT = new Field({
  key: 'log_weight_adjusted_split_seconds', 
  header: 'weight adjusted split', 
  formatter: Format.formatSplit
});

export const BEST_SPLIT = new Field({
  header: 'best split', 
  formatter: Format.formatSplit, 
  extractor: ({group}) => orderBy(group, ['log_split_seconds'])[0].log_split_seconds
});

export const LATEST_SPLIT = new Field({
  header: 'latest split', 
  formatter: Format.formatSplit, 
  extractor: ({group}) => orderBy(group, ['log_stamp'], ['desc'])[0].log_split_seconds
});

export const MEDIAN_SPLIT = new Field({
  header: 'median split', 
  formatter: Format.formatSplit,
  extractor: ({group}) => stats.median(group.map((x) => x.log_split_seconds))
});

export const COUNT = new Field({
  header: 'count', 
  formatter: Format.formatInteger, 
  extractor: ({group}) => group.length
});
