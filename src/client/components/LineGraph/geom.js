export const coords = ({xfield, yfield, viewBox, row, rect}) => [
  scale(xfield.extractor(row), [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
  scale(yfield.extractor(row), [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true),
];

export const scale = (value, rangeIn, rangeOut, invert) => {
  if (invert) {
    return scale(value, [rangeIn[1], rangeIn[0]], rangeOut, false);
  } else {
    const pct = (value - rangeIn[0])/(rangeIn[1] - rangeIn[0]);
    return rangeOut[0] + (pct * (rangeOut[1] - rangeOut[0]));
  }
};
