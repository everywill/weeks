import BridgeContext from '../bridge/bridge-context';

export default class BridgeManager {
  constructor() {
    this.bridgeCtx = new BridgeContext();
  }

  executeJsFramework(script) {
    this.bridgeCtx.executeJsFramework(script);
  }

  createInstance(instanceId, jsBundleString) {
    this.bridgeCtx.createInstance(instanceId, jsBundleString);
  }
}
