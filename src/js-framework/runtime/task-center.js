function fallback(id, options, index) {
  // const { module, method, args } = options[0];
  // console.log('---\n');
  // console.log(`instanceId: ${id}\n`);
  // console.log(`module: ${module}, method: ${method}\n`);
  // console.log('args:\n');
  // console.log(JSON.stringify(args, null, 2));
  // console.log('\n');
  global.callNative(id, options, index);
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
    createBody: 'callCreateBody',

    addElement: 'callAddElement',
    removeElement: 'callRemoveElement',
    moveElement: 'callMoveElement',
    updateAttr: 'callUpdateAttr',
    updateStyle: 'callUpdateStyle',

    addEvent: 'callAddEvent',
    removeEvent: 'callRemoveEvent',
  };

  const proto = TaskCenter.prototype;

  for (const name in DOM_METHODS) {
    
    proto[name] = (id, args) => {
      const method = global[DOM_METHODS[name]];
      
      method ? method(id, ...args) : fallback(id, [{ module: 'dom', method: name, args }]);
    };
  }

  proto.componentHandler = global.callNativeComponent;

  proto.moduleHandler = global.callNativeModule;
}
