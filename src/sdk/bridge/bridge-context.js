import CoreBridge from './core-bridge';
import SDKManager from '../manager/sdk-manager';
import ModuleMethod from './module-method';

export default class BridgeContext {
  constructor() {
    this.bridge = new CoreBridge();
  }

  executeJsFramework(filePath) {
    this.bridge.executeJsFramework(filePath);
    this.registerGlobalFunctions();
  }

  registerGlobalFunctions() {
    this.bridge.registerCallNative(this.invokeNative.bind(this));
    this.bridge.registerCallAddElement(this.invokeAddElement.bind(this));
  }

  createInstance(instanceId, jsBundleString) {
    const args = [instanceId, jsBundleString];
    this.callWorkerMethod('createInstance', args);
  }

  invokeNative(instanceId, taskArray) {
    const instance = SDKManager.instanceForId(instanceId);

    for (let task of taskArray) {
      const { module: moduleName, method: methodName, args } = task;
      const moduleMethod = new ModuleMethod({moduleName, methodName, args, instance});
      moduleMethod.invoke();
    }
  }

  invokeAddElement(instanceId, parentId, componentData, insertIndex) {
    const instance = SDKManager.instanceForId(instanceId);
    const manager = instance.componentManager;

    manager.addComponent(componentData, parentId, insertIndex);
  }

  callWorkerMethod(method, args) {
    this.bridge.callWorkerMethod(method, args);
  }
}
