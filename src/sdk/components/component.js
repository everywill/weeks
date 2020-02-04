import Emitter from '../utils/event-emitter';
import { newCSSNode } from '../layout/index';

const EE = new Emitter();

const componentEvents = ['click', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];

const toEventName = (event, id) => {
  if (componentEvents.indexOf(event) !== -1) {
    return `component-${id}-${event}`;
  }
}

export default class Component {
  constructor({
    id,
    style = {},
  }) {
    this.id = id;
    this.style = style;
    this.cssNode = {};
    this.childComponents = [];
    this.parentComponent = null;

    this.initCSSNodeWithStyle(style);

    componentEvents.forEach((eventName) => {
      this.addEvent(eventName, (e, msg) => {
        this.parentComponent && this.parentComponent.fireEvent(eventName, e, msg);
      })
    });
  }

  initCSSNodeWithStyle(style) {
    this.cssNode = newCSSNode();
    this.cssNode.context = this;
    this.cssNode.getChild = this.cssNodeGetChild;

    this.fillCSSNode(style);
  }

  fillCSSNode(style) {
    this.cssNode.style = Object.assign({}, style);
  }

  cssNodeGetChild(context, index) {
    const childComponents = context.childComponents;
    for (let i = 0; i <= index && i < childComponents.length; i++) {
      const child = childComponents[i];
      if (!child.isNeedJoinLayoutSystem) {
        index ++;
      }
    }

    if (index > 0 && index < childComponents.length) {
      return childComponents[index];
    }
  }

  insertChildComponent(childComponent, index) {
    childComponent.parentComponent = this;
    this.childComponents[index] = childComponent;
  }

  removeFromParentComponent() {

  }

  fireEvent(event, ...args) {
    EE.emit(toEventName(event, this.id), ...args);
  }

  addEvent(event, callback) {
    EE.on(toEventName(event, this.id), callback);
  }

  removeEvent(event, callback) {
    EE.off(toEventName(event, this.id), callback);
  }
}
