export class TaskCenter {
  constructor(id) {
    this.instanceId = id;
  }

  send(type, options, args) {
    const { action, component, ref, module, method } = options;

    switch(type) {
      case 'dom':
        return this[action](this.instanceId, args);
      case 'component':
        return this.componentHandler(this.instanceId, ref, method, args, { component });
      default:
        return this.moduleHandler(this.instanceId, module, method, args, {});
    }
  }
}

export function init() {
  const DOM_METHODS = {
    createBody: global.callCreateBody,

    addElement: global.callAddElement,
    removeElement: global.callRemoveElement,
    moveElement: global.callMoveElement,
    updateAttrs: global.callUpdateAttrs,
    updateStyle: global.callUpdateStyle,

    addEvent: global.callAddEvent,
    removeEvent: global.callRemoveEvent,
  };

  const proto = TaskCenter.prototype;

  for (const name in DOM_METHODS) {
    const method = DOM_METHODS[name];
    proto[name] = (id, args) => method(id, ...args);
  }

  proto.componentHandler = global.callNativeComponent;

  proto.moduleHandler = global.callNativeModule;
}
