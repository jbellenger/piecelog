import values from 'lodash/values';

export const coords = ({xcol, ycol, viewBox, row, rect}) => [
  (xcol.extractor(row) - rect.x.lo) * viewBox.width/rect.x.range, 
  (rect.y.hi - ycol.extractor(row)) * viewBox.height/rect.y.range
];

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
