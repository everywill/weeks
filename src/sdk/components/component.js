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
  return a && b && 
    a.width === b.width &&
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

    this.initCSSNodeWithStyle(style);
    
    componentEvents.forEach((eventName) => {
      this.addEvent(eventName, (e, msg) => {
        this.parentComponent && this.parentComponent.fireEvent(eventName, e, msg);
      })
    });
  }

  get view() {
    if (!this.__view) {
      this.__view = this.createView();
    }
    return this.__view;
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
    // console.log(`childCount of ${this.id}'s cssNode: ${this.cssNode.childCount}`)
  }

  childCountForLayout() {
    let count = this.childComponents.length;
    for (let child of this.childComponents) {
      if (!child.isNeedJoinLayoutSystem) {
        count --;
      }
    }

    return count;
  }

  fillCSSNode(style) {
    const { width, height, fontSize, ...rest } = style;

    if (width) {
      this.cssNode.style.width = width;
      this.setNeedsLayout();
    }

    if (height) {
      this.cssNode.style.height = height;
      this.setNeedsLayout();
    }

    if (fontSize) {
      this.cssNode.style.fontSize = fontSize;
      this.setNeedsLayout();
    }

    this.cssNode.style = Object.assign({}, this.cssNode.style, rest);
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
      left: superAbsolutePosition.left + this.cssNode.layout.left,
      top: superAbsolutePosition.top + this.cssNode.layout.top,
      width: this.cssNode.layout.width,
      height: this.cssNode.layout.height,
    };

    if (!isFrameEqual(newFrame, this.calculatedFrame)) {
      this.calculatedFrame = newFrame;
      this.view.x(newFrame.left);
      this.view.y(newFrame.top);
      this.view.width(newFrame.width);
      this.view.height(newFrame.height);
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

  updateStyle(style) {
    this.fillCSSNode(style);
  }

  updateViewStyle() {
    this.cssNode
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

  if (index >= 0 && index < childComponents.length) {
    return childComponents[index].cssNode;
  }
}
