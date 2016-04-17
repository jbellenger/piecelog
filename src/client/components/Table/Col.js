export default class Col {
  static fromArray = (arr) => arr.map((key) => new Col(key));

  constructor(key, header, formatter, extractor) {
    this.key = key;
    this.header = header || key;
    this.formatter = formatter || ((x) => x);
    this.extractor = extractor || ((obj) => obj[key]);
  }

  apply(data) {
    return this.formatter(this.extractor(data));
  }
};
