import React from 'react';
import {Link} from 'react-router';
import Col from '../Table/Col';
import * as Format from '../../modules/format';
import orderBy from 'lodash/orderBy';
import * as stats from '../../modules/stats';

const mk = (...args) => new Col(...args);

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = mk('log_piece_id', 'piece', PIECE_FORMAT);

const PIECE_TYPE_FORMAT = (value) => (
  <Link to={'/piece-type/' + value}>{value}</Link>
);
export const PIECE_TYPE = mk('piece_type', 'piece type', PIECE_TYPE_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = mk('log_person_id', 'person', PERSON_FORMAT);

export const STAMP = mk('log_stamp', null, Format.formatStamp);

export const DISTANCE = mk('log_distance_meters', 'distance');

export const TIME = mk('log_time_millis', 'time', Format.formatTime);

export const POUNDS = mk('log_weight_pounds', 'pounds', Format.formatWeight);

export const KILOS = mk('log_weight_kilos', 'kilos', Format.formatWeight);

export const SPLIT = mk('log_split_seconds', 'split', Format.formatSplit);

export const WATTS = mk('log_watts', 'watts', Format.formatWatts);

export const WATTS_PER_KG = mk('log_watts_per_kg', 'watts/kg', Format.formatWattsPerKg);

export const WEIGHT_ADJUSTED_SPLIT = mk('log_weight_adjusted_split_seconds', 'weight adjusted split', Format.formatSplit);

export const BEST_SPLIT = mk(
  null,
  'best split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_split_seconds'])[0].log_split_seconds
);

export const LATEST_SPLIT = mk(
  null,
  'latest split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_stamp'], ['desc'])[0].log_split_seconds
);

export const MEDIAN_SPLIT = mk(
  null,
  'median split', 
  Format.formatSplit,
  ({group}) => stats.median(group.map((x) => x.log_split_seconds))
);

export const COUNT = mk(
  null,
  'count', 
  Format.formatInteger, 
  ({group}) => group.length
);
