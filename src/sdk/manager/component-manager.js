import ComponentFactory from './component-factory';
import { newCSSNode, layoutNode } from '../layout/index';

export default class ComponentManager {
  constructor(instance) {
    this.instance = instance;
    this.rootComponent = null;
    this.rootCSSNode = null;
    this.builtComponent = {};
  }

  createRoot(data) {
    this.rootComponent = this.buildComponentForData(data);
    this.initRootCSSNode();
  }

  initRootCSSNode() {
    this.rootCSSNode = newCSSNode();
    this.applyRootFrame(this.instance.frame, this.rootCSSNode);

    this.rootCSSNode.context = this;
    this.rootCSSNode.childCount = 1;
    this.rootCSSNode.getChild = this.rootNodeGetChild;
    this.layout();
  }

  rootNodeGetChild(context, index) {
    if (index === 0) {
      return context.rootComponent.cssNode;
    }
    return null;
  }

  applyRootFrame(rootFrame, rootCSSNode) {
    rootCSSNode.style.left = rootFrame.origin.x;
    rootCSSNode.style.top = rootFrame.origin.y;

    rootCSSNode.style.width = rootFrame.size.width;
    rootCSSNode.style.height = rootFrame.size.height;
  }

  layout() {
    layoutNode(this.rootCSSNode, this.rootCSSNode.style.width);
  }

  addComponent(componentData, parentId, insertIndex) {
    const parentComponent = this.builtComponent[parentId];

    this.recursivelyAddComponent(componentData, parentComponent, insertIndex);
  }

  recursivelyAddComponent(componentData, parentComponent, insertIndex) {
    const component = this.buildComponentForData(componentData);
    const index = insertIndex === -1 ? parentComponent.childComponents.length : insertIndex;

    parentComponent.insertChildComponent(component, index);

    const childComponentsData = componentData.children || [];

    // todo: relayout

    for (let childComponentData of childComponentsData) {
      this.recursivelyAddComponent(childComponentData, component, -1);
    }
  }

  buildComponentForData(data) {
    // console.log('buildComponentForData received:');
    // console.log(data);
    // console.log('---');
    const { type, id } = data;
    const Clazz = ComponentFactory.classWithComponentName(type);

    const component = new Clazz(data);

    this.builtComponent[id] = component;

    return component;
  }

  removeComponent(id) {
    const component = this.builtComponent[id];

    component.removeFromParentComponent();
    delete this.builtComponent[id];

    // todo: relayout
  }
}
