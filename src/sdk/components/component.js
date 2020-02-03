import Emitter from '../utils/event-emitter';

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

    componentEvents.forEach((eventName) => {
      this.addEvent(eventName, (e, msg) => {
        this.parentComponent && this.parentComponent.fireEvent(eventName, e, msg);
      })
    });
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
