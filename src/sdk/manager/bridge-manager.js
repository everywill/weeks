import BridgeContext from '../bridge/bridge-context';

export default class BridgeManager {
  constructor() {
    this.bridgeCtx = new BridgeContext();
  }

  executeJsFramework(filePath) {
    this.bridgeCtx.executeJsFramework(filePath);
  }

  createInstance(instanceId, jsBundleString) {
    this.bridgeCtx.createInstance(instanceId, jsBundleString);
  }
}
