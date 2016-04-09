import Col from '../Table/Col';
import * as Format from '../../modules/format';

export const _ALL_COLS = {};
const mk = (...args) => {
  const col = new Col(...args);
  _ALL_COLS[col.key] = col;
  return col;
};

export const PIECE_TYPE = mk('piece_type', 'piece type');
export const BEST_SPLIT = mk('best_split_seconds', 'best split', Format.formatSplit);
export const LATEST_SPLIT = mk('latest_split_seconds', 'latest split', Format.formatSplit);

export const _ALL_KEYS = Object.keys(_ALL_COLS);
