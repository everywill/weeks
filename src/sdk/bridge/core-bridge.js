const { Worker } = require('worker_threads');

export default class CoreBridge {
  constructor() {}

  executeJsFramework(filePath) {
    const worker = new Worker(filePath);
  }

  callWorkerMethod(method, args) {

  }
}
