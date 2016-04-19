import React from 'react';
import {Link} from 'react-router';
import Col from '../Table/Col';
import * as Format from '../../modules/format';
import orderBy from 'lodash/orderBy';
import * as stats from '../../modules/stats';
import SparkLine from '../SparkLine';

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = new Col('log_piece_id', 'piece', PIECE_FORMAT);

const PIECE_TYPE_FORMAT = (value) => (
  <Link to={'/piece-type/' + value}>{value}</Link>
);
export const PIECE_TYPE = new Col('piece_type', 'piece type', PIECE_TYPE_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = new Col('log_person_id', 'person', PERSON_FORMAT);

export const STAMP = new Col('log_stamp', null, Format.formatStamp);

export const DISTANCE = new Col('log_distance_meters', 'distance');

export const TIME = new Col('log_time_millis', 'time', Format.formatTime);

export const POUNDS = new Col('log_weight_pounds', 'pounds', Format.formatWeight);

export const KILOS = new Col('log_weight_kilos', 'kilos', Format.formatWeight);

export const SPLIT = new Col('log_split_seconds', 'split', Format.formatSplit);

export const WATTS = new Col('log_watts', 'watts', Format.formatWatts);

export const WATTS_PER_KG = new Col('log_watts_per_kg', 'watts/kg', Format.formatWattsPerKg);

export const WEIGHT_ADJUSTED_SPLIT = new Col('log_weight_adjusted_split_seconds', 'weight adjusted split', Format.formatSplit);

export const BEST_SPLIT = new Col(
  null,
  'best split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_split_seconds'])[0].log_split_seconds
);

export const LATEST_SPLIT = new Col(
  null,
  'latest split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_stamp'], ['desc'])[0].log_split_seconds
);

export const MEDIAN_SPLIT = new Col(
  null,
  'median split', 
  Format.formatSplit,
  ({group}) => stats.median(group.map((x) => x.log_split_seconds))
);

export const COUNT = new Col(
  null,
  'count', 
  Format.formatInteger, 
  ({group}) => group.length
);

const SPARKLINE_FORMAT = (rows) => <SparkLine x="log_stamp" y="log_split_seconds" rows={rows} />;

export const SPLIT_SPARKLINE = new Col(
  null,
  'history',
  SPARKLINE_FORMAT,
  ({group}) => group
);
