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
        global.parentPort.postMessage({cmd: 'callNative', data: {instanceId, taskArray}});
      `],
    ]);
    this.callNative = function(data) {
      console.log('data received in callNative:');
      console.log(JSON.stringify(data, null, 2));
      console.log('---');
      const { instanceId, taskArray } = data;
      callNative(instanceId, taskArray);
    }
  }

  registerCallAddElement(callAddElement) {
    this.callWorkerMethod('registerMethod', [
      'callAddElement',
      ['instanceId', 'parentId', 'componentData', 'insertIndex', `
        global.parentPort.postMessage({cmd: 'callAddElement', data: {instanceId, parentId, componentData, insertIndex}});
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
    this.jsContext.postMessage({cmd: 'invokeMethod', data: { name: method, args}});
  }
}
