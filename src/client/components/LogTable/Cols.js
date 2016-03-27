import React from 'react';
import { Link } from 'react-router';
import Col from '../Table/Col';

const PIECE_FORMAT = (value) => (
  <Link to={'/piece/' + value}>{value}</Link>
);
export const PIECE = new Col('piece_id', 'piece', PIECE_FORMAT);

const PERSON_FORMAT = (value) => (
  <Link to={'/person/' + value}>{value}</Link>
);
export const PERSON = new Col('person_id', 'person', PERSON_FORMAT);

const STAMP_FORMAT = (value) => new Date(value).toDateString();
export const STAMP = new Col('stamp', null, STAMP_FORMAT);

export const DISTANCE = new Col('distance_meters', 'distance');

export const TIME = new Col('time_millis', 'time');

export const WEIGHT = new Col('weight_kilos', 'kilos');

export const RACING_AGE = new Col('racingage', 'racing age');
