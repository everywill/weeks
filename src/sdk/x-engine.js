import { View, Text, Image, ScrollView } from './components/index';
import ComponentFactory from './manager/component-factory';
import ModuleFactory from './manager/module-factory';
import SDKManager from './manager/sdk-manager';
import { DomModule } from './modules/index';

export default class RenderXEngine {}

RenderXEngine.initSDKEnvironment = function (filePath) {
  RenderXEngine.registerDefaults();
  SDKManager.bridgeMgr.executeJsFramework(filePath);
}

RenderXEngine.registerDefaults = function () {
  RenderXEngine.registerDefaultComponents();
  RenderXEngine.registerDefaultModules();
}

RenderXEngine.registerDefaultComponents = function () {
  RenderXEngine.registerComponent('view', View);
  RenderXEngine.registerComponent('text', Text);
  RenderXEngine.registerComponent('image', Image);
  RenderXEngine.registerComponent('scrollview', ScrollView);
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
