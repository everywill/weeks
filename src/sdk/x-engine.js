import { View, Text, Image, ScrollView } from './components';
import ComponentFactory from './manager/component-factory';
import ModuleFactory from './manager/module-factory';
import { DomModule } from './modules';

export default class RenderXEngine {}

RenderXEngine.initSDKEnvironment = function (script) {
  RenderXEngine.registerDefaults();
  // todo  从script注入context特异方法
}

RenderXEngine.registerDefaults = function () {
  RenderXEngine.registerDefaultComponents();
  RenderXEngine.registerDefaultModules();
}

RenderXEngine.registerDefaultComponents = function () {
  RenderXEngine.registerComponent('view', View);
  RenderXEngine.registerComponent('text', Text);
  RenderXEngine.registerComponent('image', Image);
  RenderXEngine.registerComponent('scroll', ScrollView);
}

RenderXEngine.registerDefaultModules = function () {
  RenderXEngine.registerModule('dom', DomModule);
}

RenderXEngine.registerComponent = function (name, clazz) {
  ComponentFactory.registerComponent(name, clazz);
}

RenderXEngine.registerModule = function (name, clazz) {
  ModuleFactory.registerModule(name, clazz);
}
