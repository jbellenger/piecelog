import React from 'react';
import { Link } from 'react-router';
import Col from '../Table/Col';
import * as Format from '../../modules/format';

export const _ALL_COLS = [];
const mk = (...args) => {
  const col = new Col(...args);
  _ALL_COLS.push(col);
  return col;
};

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = mk('log_piece_id', 'piece', PIECE_FORMAT);

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

export const _ALL_KEYS = _ALL_COLS.map((x) => x.key);
