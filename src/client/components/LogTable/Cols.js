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
