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

  addEvent(msg) {
    console.log(`dom-module receives addEvent: ${msg}`);
  }
  removeEvent() {}
} 
