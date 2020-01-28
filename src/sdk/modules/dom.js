export default class DomModule {
  constructor(renderXInstance) {
    this.manager = renderXInstance.componentManager;
  }

  addElement(element, parentId, insertIndex) {
    this.manager.addComponent(element, parentId, insertIndex);
  }
  removeElement(componentId) {
    this.manager.removeComponent(componentId);
  }

  addEvent() {}
  removeEvent() {}
} 
