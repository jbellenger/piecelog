import {PropTypes} from 'react';
import LogEntry from '../../modules/model/LogEvent';

export const LogRowsShape = PropTypes.arrayOf(PropTypes.instanceOf(LogEntry));
