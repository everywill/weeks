import Emitter from '../utils/event-emitter';

const EE = new Emitter();

let uuid = 0;
const elementEvents = ['click', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];

const toEventName = (event, id) => {
  if (elementEvent.indexOf(event) !== -1) {
    return `element-${id}-${event}`;
  }
}

export default class Element {
  constructor({
    id = ++uuid,
    style = {},
  }) {
    this.id = id;
    this.style = style;
    this.cssNode = {};
    this.children = {};
    this.parentNode = null;

    elementEvents.forEach((eventName) => {
      this.addEvent(eventName, (e, msg) => {
        this.parent && this.parent.fireEvent(eventName, e, msg);
      })
    });
  }

  insertChildComponent(childNode) {
    
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
