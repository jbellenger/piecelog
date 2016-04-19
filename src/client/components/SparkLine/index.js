import React,{PropTypes} from 'react';
import styles from './styles.css';

export default class SparkLine extends React.Component {
  static propTypes = {
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
  };

  range() {
    const {x, y, rows} = this.props;
    const padding = .1;

    let xlo, xhi, ylo, yhi;
    const coords = rows.forEach((row) => {
      if (xlo === undefined || row[x] < xlo) {
        xlo = row[x];
      }
      if (xhi === undefined || row[x] > xhi) {
        xhi = row[x];
      }
      if (ylo === undefined || row[y] < ylo) {
        ylo = row[y];
      }
      if (yhi === undefined || row[y] > yhi) {
        yhi = row[y];
      }
    });
    return [
      [xlo * (1-padding), xhi * (1+padding)],
      [ylo * (1-padding), yhi * (1+padding)],
    ];
  }

  coords() {
    const {x, y, rows} = this.props;
    const [[xlo, xhi], [ylo, yhi]] = this.range();

    return rows
      .map((row) => [row[x], row[y]])
      .map((coord) => {
        const cx = (coord[0]-xlo)/(xhi-xlo);
        const cy = (yhi-coord[1])/(yhi-ylo);
        return [cx, cy];
      });
  }

  render() {
    const points = this.coords().map((coord) => (
      <circle
        cx={coord[0] * 100 + "%"}
        cy={coord[1] * 100 + "%"}
        className={styles.point}
      />
    ));
    
    return (
      <svg className={styles.root}>
        {points}
      </svg>
    );
  }
};
