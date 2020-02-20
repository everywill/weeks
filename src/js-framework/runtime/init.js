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
    console.log(`js-framework: createInstance received id: ${id}`);
    return framework.createInstance(id, code);
  }
}

function registerMethod(methodName, method) {
  let g = global || globalThis;
  g[methodName] = new Function(...method);
}

function requestIdleCallback(cb) {
  // if (requestIdleCallback) return requestIdleCallback(cb)
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
}

function cancelIdleCallback (id) {
  if (global.cancelIdleCallback) return global.cancelIdleCallback(id)
    return clearTimeout(id);
}

const methods = {
  createInstance,
  registerMethod,
  requestIdleCallback,
};

export default function init (config) {
  initTaskHandler();

  framework = config.framework || {};

  framework.init(config);

  return methods;
}
