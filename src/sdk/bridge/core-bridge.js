const { Worker } = require('worker_threads');

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
        // console.log(global)
        global.parentPort.postMessage({cmd: 'callNative', data: {instanceId, taskArray}});
      `],
    ]);
    this.callNative = function(data) {
      const { instanceId, taskArray } = data;
      callNative(instanceId, taskArray);
    }
  }

  registerCallAddElement(callAddElement) {
    this.callWorkerMethod('registerMethod', [
      'callAddElement',
      []
    ]);
  }

  callWorkerMethod(method, args) {
    this.jsContext.postMessage({cmd: 'invokeMethod', data: { name: method, args}});
  }
}
