import LinearTransform from './LinearTransform';

export default class Geometry {
  constructor(fromSpace, toSpace) {
    this.fromSpace = fromSpace;
    this.toSpace = toSpace;

    // spaces specified as
    //   [[xlo, xhi], [ylo, yhi]]
    this.x = new LinearTransform(fromSpace[0], toSpace[0]);
    this.y = new LinearTransform(fromSpace[1], toSpace[1]);
  }

  map([x, y]) {
    return [this.x.map(x), this.y.map(y)];
  }

  invert() {
    return new Geometry(this.toSpace, this.fromSpace);
  }
}
