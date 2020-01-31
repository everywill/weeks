function fallback(id, options, index) {
  const { module, method, args } = options[0];
  console.log('---\n');
  console.log(`instanceId: ${id}\n`);
  console.log(`module: ${module}, method: ${method}\n`);
  console.log('args:\n');
  console.log(JSON.stringify(args, null, 2));
  console.log('\n');
}

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
    proto[name] = method ?
      (id, args) => method(id, ...args) :
      (id, args) => fallback(id, [{ module: 'dom', method: name, args }], '-1');
  }

  proto.componentHandler = global.callNativeComponent;

  proto.moduleHandler = global.callNativeModule;
}
