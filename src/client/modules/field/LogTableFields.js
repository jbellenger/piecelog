import React from 'react';
import {Link} from 'react-router';
import Field from '.';
import * as Format from '../format';
import orderBy from 'lodash/orderBy';
import * as stats from '../stats';

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = new Field('log_piece_id', 'piece', PIECE_FORMAT);

const PIECE_TYPE_FORMAT = (value) => (
  <Link to={'/piece-type/' + value}>{value}</Link>
);
export const PIECE_TYPE = new Field('piece_type', 'piece type', PIECE_TYPE_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = new Field('log_person_id', 'person', PERSON_FORMAT);

export const STAMP = new Field('log_stamp', null, Format.formatStamp);

export const DISTANCE = new Field('log_distance_meters', 'distance');

export const TIME = new Field('log_time_millis', 'time', Format.formatTime);

export const POUNDS = new Field('log_weight_pounds', 'pounds', Format.formatWeight);

export const KILOS = new Field('log_weight_kilos', 'kilos', Format.formatWeight);

export const SPLIT = new Field('log_split_seconds', 'split', Format.formatSplit);

export const WATTS = new Field('log_watts', 'watts', Format.formatWatts);

export const WATTS_PER_KG = new Field('log_watts_per_kg', 'watts/kg', Format.formatWattsPerKg);

export const WEIGHT_ADJUSTED_SPLIT = new Field('log_weight_adjusted_split_seconds', 'weight adjusted split', Format.formatSplit);

export const BEST_SPLIT = new Field(
  null,
  'best split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_split_seconds'])[0].log_split_seconds
);

export const LATEST_SPLIT = new Field(
  null,
  'latest split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_stamp'], ['desc'])[0].log_split_seconds
);

export const MEDIAN_SPLIT = new Field(
  null,
  'median split', 
  Format.formatSplit,
  ({group}) => stats.median(group.map((x) => x.log_split_seconds))
);

export const COUNT = new Field(
  null,
  'count', 
  Format.formatInteger, 
  ({group}) => group.length
);
