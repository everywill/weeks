import { View, Text, Image, ScrollView } from './components';
import { DomModule } from './modules';

export default class RenderXEngine {
  constructor() {
    this.componentFactory = {};
  }

  initSDKEnvironment(script) {
    this.registerDefaults();
    // todo  从script注入context特异方法
  }

  registerDefaults() {
    this.registerDefaultComponents();
    this.registerDefaultModules();
  }

  registerDefaultComponents() {
    this.registerComponent('view', View);
    this.registerComponent('text', Text);
    this.registerComponent('image', Image);
    this.registerComponent('scroll', ScrollView);
  }
  registerDefaultModules() {
    this.registerModule('dom', DomModule);
  }

  registerComponent(name, clazz) {
    this.componentFactory[name] = clazz;
  }

  registerModule(name, clazz) {
    
  }
}