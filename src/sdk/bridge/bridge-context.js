import CoreBridge from './core-bridge';

export default class BridgeContext {
  constructor() {
    this.bridge = new CoreBridge();
  }

  executeJsFramework(filePath) {
    this.bridge.executeJsFramework(filePath);
    this.registerGlobalFunctions();
  }

  registerGlobalFunctions() {
    this.bridge.registerCallParent();
    this.bridge.registerCallAddElement();
  }

  createInstance(instanceId, jsBundleString) {
    const args = [instanceId, jsBundleString];
    this.callWorkerMethod('createInstance', args);
  }

  callWorkerMethod(method, args) {
    this.bridge.callWorkerMethod(method, args);
  }
}
