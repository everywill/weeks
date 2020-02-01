import CoreBridge from './core-bridge';

export default class BridgeContext {
  constructor() {
    this.bridge = new CoreBridge();

    this.registerGlobalFunctions();
  }

  executeJsFramework(script) {
    this.bridge.executeJsFramework(script);
  }

  registerGlobalFunctions() {}

  createInstance(instanceId, jsBundleString) {
    const args = [instanceId, jsBundleString];
    this.callWorkerMethod('createInstance', args);
  }

  callWorkerMethod(method, args) {
    this.bridge.callWorkerMethod(method, args);
  }
}
