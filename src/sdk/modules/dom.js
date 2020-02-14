export default class DomModule {
  constructor(renderXInstance) {
    this.manager = renderXInstance.componentManager;
  }

  createBody(body) {
    this.manager.createRoot(body);
  }

  addElement(element, parentId, insertIndex) {
    this.manager.addComponent(element, parentId, insertIndex);
  }
  removeElement(componentId) {
    this.manager.removeComponent(componentId);
  }

  updateStyle(componentId, style) {
    this.manager.updateStyle(componentId, style);
  }

  updateAttrs(componentId, attribute) {
    console.log('dom-module updateAttrs');
  }

  addEvent(msg) {
    console.log(`dom-module receives addEvent: ${msg}`);
  }
  removeEvent() {}
} 
