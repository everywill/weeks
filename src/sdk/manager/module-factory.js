const moduleMap = {};

export default class ModuleFactory {
  constructor() {}
}

ModuleFactory.registerModule = function (name, clazz) {
  moduleMap[name] = clazz;
}

ModuleFactory.classWithModuleName = function (name) {
  return moduleMap[name];
}
