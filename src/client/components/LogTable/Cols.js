import React from 'react';
import { Link } from 'react-router';
import Col from '../Table/Col';

export const _ALL_COLS = [];
const mk = (...args) => {
  const col = new Col(...args);
  _ALL_COLS.push(col);
  return col;
};

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = mk('piece_id', 'piece', PIECE_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = mk('person_id', 'person', PERSON_FORMAT);

const STAMP_FORMAT = (value) => new Date(value).toDateString();
export const STAMP = mk('stamp', null, STAMP_FORMAT);

export const DISTANCE = mk('distance_meters', 'distance');

export const TIME = mk('time_millis', 'time');

export const POUNDS = mk('weight_pounds', 'pounds');

export const KILOS = mk('weight_kilos', 'kilos');

export const RACING_AGE = mk('racingage', 'racing age');

export const SPLIT = mk('split_seconds', 'split');

export const WATTS = mk('watts', 'watts');

export const WATTS_PER_KG = mk('watts_per_kg', 'watts/kg');

export const _ALL_KEYS = _ALL_COLS.map((x) => x.key);
