import Col from '../Table/Col';
import * as Format from '../../modules/format';
import orderBy from 'lodash/orderBy';

export const _ALL_COLS = {};
const mk = (...args) => {
  const col = new Col(...args);
  _ALL_COLS[col.key] = col;
  return col;
};

export const PIECE_TYPE = mk('piece_type', 'piece type');
export const BEST_SPLIT = mk(
  'best_split_seconds', 
  'best split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_split_seconds'])[0].log_split_seconds
);
export const LATEST_SPLIT = mk(
  'latest_split_seconds', 
  'latest split', 
  Format.formatSplit, 
  ({group}) => orderBy(group, ['log_stamp'], ['desc'])[0].log_split_seconds
);

export const _ALL_KEYS = Object.keys(_ALL_COLS);
