const componentMap = {};

export default class ComponentFactory {
  constructor() {}
}

ComponentFactory.registerComponent = function (name, clazz) {
  componentMap[name] = clazz;
}

ComponentFactory.classWithComponentName = function (name) {
  return componentMap[name];
}
