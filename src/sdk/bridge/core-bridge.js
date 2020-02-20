// eliminate differences between node and web
global = global || globalThis;
if (global.Worker) {
  global.Worker.prototype.on = function(type, cb) {
    this.onmessage = (e) => {
      cb(e.data);
    }
  }
} else {
  global.Worker = require('worker_threads').Worker;
}

export default class CoreBridge {
  constructor() {}

  executeJsFramework(filePath) {
    const worker = new Worker(filePath);
    worker.on('message', (message) => {
      this.dispatchMsg(message);
    })
    this.jsContext = worker;
  }

  dispatchMsg(message) {
    const { cmd, data } = message;
    const method = this[cmd].bind(this);
    return method(data);
  }

  registerCallNative(callNative) {
    this.callWorkerMethod('registerMethod', [
      'callNative', 
      ['instanceId', 'taskArray', `
        globalThis.parentPort.postMessage({cmd: 'callNative', data: {instanceId, taskArray}});
      `],
    ]);
    this.callNative = function(data) {
      // console.log('data received in callNative:');
      // console.log(JSON.stringify(data, null, 2));
      // console.log('---');
      const { instanceId, taskArray } = data;
      callNative(instanceId, taskArray);
    }
  }

  registerCallAddElement(callAddElement) {
    this.callWorkerMethod('registerMethod', [
      'callAddElement',
      ['instanceId', 'parentId', 'componentData', 'insertIndex', `
        globalThis.parentPort.postMessage({cmd: 'callAddElement', data: {instanceId, parentId, componentData, insertIndex}});
      `]
    ]);
    this.callAddElement = function(data) {
      console.log('data received in callAddElement:');
      console.log(data);
      console.log('---');
      const { instanceId, parentId, componentData, insertIndex } = data;
      callAddElement(instanceId, parentId, componentData, insertIndex);
    }
  }

  callWorkerMethod(method, args) {
    console.log(`callWorkerMethod ${method}`);
    console.log(args);
    this.jsContext.postMessage({cmd: 'invokeMethod', data: { name: method, args}});
  }
}
