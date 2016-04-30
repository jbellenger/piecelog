import values from 'lodash/values';

export const coords = ({xcol, ycol, viewBox, row, rect}) => [
  scale(xcol.extractor(row), [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
  scale(ycol.extractor(row), [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true),
];

export const scale = (value, rangeIn, rangeOut, invert) => {
  if (invert) {
    return scale(value, [rangeIn[1], rangeIn[0]], rangeOut, false);
  } else {
    const pct = (value - rangeIn[0])/(rangeIn[1] - rangeIn[0]);
    return rangeOut[0] + (pct * (rangeOut[1] - rangeOut[0]));
  }
};

export const rect = ({series, xcol, ycol}) => {
  const rect = {x: {}, y: {}};

  values(series).forEach((rows) => {
    rows.forEach((row) => {
      const x = xcol.extractor(row);
      const y = ycol.extractor(row);

      if (rect.x.lo === undefined || x < rect.x.lo) {
        rect.x.lo = x;
      }
      if (rect.x.hi === undefined || x > rect.x.hi) {
        rect.x.hi = x;
      }
      if (rect.y.lo === undefined || y < rect.y.lo) {
        rect.y.lo = y;
      }
      if (rect.y.hi === undefined || y > rect.y.hi) {
        rect.y.hi = y;
      }
    });
  });
  if (rect.x.lo !== undefined) {
    rect.x.range = rect.x.hi - rect.x.lo;
  }
  if (rect.y.lo !== undefined) {
    rect.y.range = rect.y.hi - rect.y.lo;
  }

  return rect;
}
