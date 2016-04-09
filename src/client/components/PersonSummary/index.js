import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import LogEvent from '../../modules/model/LogEvent';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as Cols from './Cols';
import Table from '../Table';

const mapStateToProps = (state, {personId}) => {
  const models = modelsSelector(state);
  const allRows = models.exec(`
    select 
      ${LogEvent.fields.join(',')},
      piece.piece_type
    from log 
    join piece on log.log_piece_id=piece.piece_id
    where log.log_person_id=?
    order by log_stamp
  `, [personId]);

  const grouped = groupBy(allRows, (x) => x.piece_type);
  const rows = Object.keys(grouped).map((pieceType) => {
    const typeRows = grouped[pieceType];
    const best = orderBy(typeRows, ['log_split_seconds'])[0];
    const latest = orderBy(typeRows, ['log_stamp'], ['desc'])[0];
    return {
      piece_type: pieceType,
      best_split_seconds: best.log_split_seconds,
      latest_split_seconds: latest.log_split_seconds,
    };
  });

  return {
    rows: rows,
    cols: Cols._ALL_KEYS.map((k) => Cols._ALL_COLS[k])
  };
};

export default connect(mapStateToProps)(Table);
