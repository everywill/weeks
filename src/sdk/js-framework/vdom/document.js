import { TaskCenter } from '../task-center';
import { addDoc } from './operation';
import Element from './element';

export default class Document {
  constructor(id) {
    this.id = id;
    addDoc(id, this);

    this.taskCenter = new TaskCenter(id);
  }

  createElement(tagName, props) {
    return new Element(tagName, props);
  }
}
