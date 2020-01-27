let uuid = 0;

class Element {
  constructor({
    id = ++uuid,
  }) {
    this.children = {};
    this.parent = null;
    this.id = id;
  }
}

module.exports = Element;