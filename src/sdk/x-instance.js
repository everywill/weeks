import SDKManager from './manager/sdk-manager';
import ComponentManager from './manager/component-manager';

let uuid = 0

export default class renderXInstance {
  constructor() {
    this.instanceId = uuid ++;
    this.componentManager = new ComponentManager(this);
    this.moduleInstances = {};
    SDKManager.storeInstance(this, this.instanceId);
  }

  moduleForClass(ModuleClass) {
    let moduleInstace = this.moduleInstances[ModuleClass];
    if (!moduleInstace) {
      moduleInstace = new ModuleClass(this);
      this.moduleInstances[ModuleClass] = moduleInstace;
    }

    return moduleInstace;
  }

  renderWithURL(bundleUrl) {}

  renderWithBundleString(jsBundleString) {
    SDKManager.bridgeMgr.createInstance(this.instanceId, jsBundleString);
  }
}
