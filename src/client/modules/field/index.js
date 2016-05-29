export default class Field {
  constructor({key, header, formatter, extractor}) {
    this.key = key;
    this.header = header || key;
    this.formatter = formatter || ((x) => x);
    this.extractor = extractor || ((obj) => obj[key]);
  }

  apply(data) {
    return this.formatter(this.extractor(data));
  }
};
