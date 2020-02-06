import Emitter from '../utils/event-emitter';
import { newCSSNode } from '../layout/index';

const EE = new Emitter();

const componentEvents = ['click', 'touchstart', 'touchmove', 'touchend', 'touchcancel'];

const toEventName = (event, id) => {
  if (componentEvents.indexOf(event) !== -1) {
    return `component-${id}-${event}`;
  }
}

const isFrameEqual = (a, b) => {
  return a.width === b.width &&
    a.height === b.height &&
    a.left === b.left &&
    a.top === b.top;
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

    this.isLayoutDirty = true;
    this.isNeedJoinLayoutSystem = true;

    this.calculatedFrame = {
      width: undefined,
      height: undefined,
      left: undefined,
      top: undefined,
    };

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
    this.cssNode.isDirty = Component.cssNodeIsDirty;
    this.cssNode.getChild = Component.cssNodeGetChild;

    this.recomputeCSSNodeChildren();
    this.fillCSSNode(style);
  }

  recomputeCSSNodeChildren() {
    this.cssNode.childCount = this.childCountForLayout();
  }

  childCountForLayout() {
    let count = this.childComponents.length;
    for (let child in this.childComponents) {
      if (!child.isNeedJoinLayoutSystem) {
        count --;
      }
    }

    return count;
  }

  fillCSSNode(style) {
    this.cssNode.style = Object.assign({}, style);
  }

  setNeedsLayout() {
    this.isLayoutDirty = true;
    if (this.parentComponent) {
      this.parentComponent.setNeedsLayout();
    }
  }

  calculateFrameWithSuperAbsolutePosition(superAbsolutePosition) {
    this.isLayoutDirty = false;
    const newFrame = {
      height: this.cssNode.layout.height,
      width: this.cssNode.layout.width,
      left: superAbsolutePosition.left + this.cssNode.layout.left,
      top: superAbsolutePosition.top + this.cssNode.layout.top,
    };

    if (!isFrameEqual(newFrame, this.calculatedFrame)) {
      this.calculatedFrame = newFrame;
    }

    for (let child of this.childComponents) {
      child.calculateFrameWithSuperAbsolutePosition({
        left: newFrame.left,
        top: newFrame.top,
      });
    }
  }

  insertChildComponent(childComponent, index) {
    childComponent.parentComponent = this;
    this.childComponents[index] = childComponent;

    this.recomputeCSSNodeChildren();
    this.setNeedsLayout();
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

Component.cssNodeIsDirty = function(context) {
  return context.isLayoutDirty;
}

Component.cssNodeGetChild = function(context, index) {
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
