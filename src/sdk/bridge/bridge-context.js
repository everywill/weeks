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
}
