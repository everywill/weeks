import { init as initTaskHandler } from './task-center';

const instanceMap = {};
let framework;

function createInstance(id, code) {
  let info = instanceMap[id];
  if (!info) {
    instanceMap[id] = {
      created: Date.now(),
      framework: 'xRender',
    }
    
    return framework.createInstance(id, code);
  }
}

function registerMethod(methodName, method) {
  global = global || globalThis;
  global[methodName] = new Function(...method);
}

const methods = {
  createInstance,
  registerMethod,
};

export default function init (config) {
  initTaskHandler();

  framework = config.framework || {};

  framework.init(config);

  return methods;
}
