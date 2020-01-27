let uuid = 0;

class Element {
  constructor({
    id = ++uuid,
    style = {},
  }) {
    this.id = id;
    this.style = style;
    this.cssNode = {};
    this.children = {};
    this.parent = null;
  }

  insertSubview() {
    throw 'should be reimplemented in sub-class';
  }

  fireEvent() {}

  addEvent() {}

  removeEvent() {}
}

module.exports = Element;