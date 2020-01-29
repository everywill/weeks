import ModuleFactory from '../manager/module-factory';

export default class ModuleMethod {
  constructor({
    moduleName,
    methodName,
    args,
    instance,
  }) {
    this.moduleName = moduleName;
    this.methodName = methodName;
    this.args = args;
    this.instance = instance;
  }

  invoke() {
    const ModuleClass = ModuleFactory.classWithModuleName(this.moduleName);
    const moduleInstance = this.instance.moduleForClass(ModuleClass);
  }
}
