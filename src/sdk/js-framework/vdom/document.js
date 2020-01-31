import { TaskCenter } from '../task-center';
import { addDoc, setBody, appendBody } from './operation';
import Element from './element';

export default class Document {
  constructor(id) {
    this.id = id;
    this.nodeMap = {};
    addDoc(id, this);

    this.taskCenter = new TaskCenter(id);
    this.createDocumentElement();
  }

  createDocumentElement() {
    if (!this.documentElement) {
      const el = new Element('document');
      el.docId = this.id;
      el.ownerDocument = this;
      el.depth = 0;
      this.documentElement = el;

      Object.defineProperty(el, 'appendChild', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: (node) => {
          appendBody(this, node);
        }
      });
    }
    return this.documentElement;
  }

  createBody(type, props) {
    if (!this.body) {
      const el = new Element(type, props)
      setBody(this, el)
    }

    return this.body
  }

  createElement(tagName, props) {
    return new Element(tagName, props);
  }
}
