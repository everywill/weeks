import { TaskCenter } from '../task-center';
import Element from './element';

function updateElement (el, changes) {
  const attrs = changes.attrs || {}
  for (const name in attrs) {
    el.setAttr(name, attrs[name], true)
  }
  const style = changes.style || {}
  for (const name in style) {
    el.setStyle(name, style[name], true)
  }
}

export default class Document {
  constructor(id, ) {
    this.id = id;
    this.taskCenter = new TaskCenter();
  }

  createElement(tagName, props) {
    return new Element(tagName, props);
  }

  fireEvent (el, type, e, domChanges) {
    if (!el) {
      return
    }
    e = e || {}
    e.type = type
    e.target = el
    e.timestamp = Date.now()
    if (domChanges) {
      updateElement(el, domChanges)
    }
    return el.fireEvent(type, e)
  }
}