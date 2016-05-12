export default class LinearTransform {
  constructor(fromRange, toRange) {
    this.fromRange = fromRange;
    this.toRange = toRange;
  }

  value(pct) {
    return this.fromRange[0] + pct * (this.fromRange[1] - this.fromRange[0]);
  }

  map(x) {
    const pct = (x - this.fromRange[0])/(this.fromRange[1] - this.fromRange[0]);
    return this.toRange[0] + (pct * (this.toRange[1] - this.toRange[0]));
  }

  invert() {
    return new LinearTransform(this.toRange, this.fromRange);
  }
}
