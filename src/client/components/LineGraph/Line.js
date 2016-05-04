import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import classNames from 'classnames';
import * as geom from './geom';
import * as shapes from './shapes'
import styles from './styles.css';

export default class Line extends React.Component {
  static propTypes = {
    onSeriesClick: PropTypes.func,
    rows: PropTypes.array.isRequired,
    key: PropTypes.string.isRequired,
  };

  render() {
    const {rows, onSeriesClick, key, index} = this.props;
    if (rows.length < 2) return null;

    const head = geom.coords({row: rows[0], ...this.props});
    const d = SvgPath()
      .to(head[0], head[1]);

    rows.slice(1).forEach((row) => {
      const [x, y] = geom.coords({row, ...this.props});
      d.line(x, y);
    });

    let cnames = classNames(styles.line, styles["i"+index]);
    if (onSeriesClick) {
      cnames = classNames(cnames, styles.hot);
    }

    return <path 
      className={cnames} 
      onClick={onSeriesClick && (() => onSeriesClick(key))}
      d={d.str()} />;
  }
}
