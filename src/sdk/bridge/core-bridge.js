const { Worker } = require('worker_threads');

export default class CoreBridge {
  constructor() {}

  executeJsFramework(filePath) {
    const worker = new Worker(filePath);
    this.jsContext = worker;
  }

  registerCallParent(callParent) {
    this.callWorkerMethod('registerMethod', {callParent});
  }

  registerCallAddElement(callAddElement) {
    this.callWorkerMethod('registerMethod', {callAddElement});
  }

  callWorkerMethod(method, args) {
    this.worker.postMessage({cmd: 'invokeMethod', data: { name: method, args}});
  }
}
