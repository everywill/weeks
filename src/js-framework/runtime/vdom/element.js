import { 
  getTaskCenter,
  uniqueId,
  linkParent,
  insertIndex,
  getDoc,
  removeIndex,
} from './operation';

function registerNode (docId, node) {
  const doc = getDoc(docId);
  doc.nodeMap[node.nodeId] = node;
}

export default class Element {
  constructor(type, props = {}) {
    this.type = type;
    this.nodeType = 1;
    this.nodeId = uniqueId();
    this.attr = props.attr || {};
    this.style = props.style || {};
    this.event = {};
    this.children = [];
  }

  appendChild(node) {
    linkParent(node, this);
    insertIndex(node, this.children, this.children.length, true);

    if (this.docId) {
      registerNode(this.docId, node)
    }

    const taskCenter = getTaskCenter(this.docId)
    if (taskCenter) {
      return taskCenter.send(
        'dom',
        { action: 'addElement' },
        [this.nodeId, node.toJSON(), -1],
      );
    }
  }

  removeChild(node) {
    removeIndex(node, node.parentNode.children, true);
    const taskCenter = getTaskCenter(this.docId);
    taskCenter.send(
      'dom',
      { action: 'removeElement' },
      [node.nodeId],
    );
  }

  setAttr (key, value) {
    if (this.attr[key] === value) {
      return;
    }
    this.attr[key] = value;
    const taskCenter = getTaskCenter(this.docId);
    console.log('js-framework: setAttr:')
    console.log(`js-framework: ${key}: ${value}`);
    if (taskCenter) {
      console.log('send updateAttr to task-center');
      const result = {};
      result[key] = value;
      taskCenter.send(
        'dom',
        { action: 'updateAttr' },
        [this.nodeId, result],
      );
    }
  }

  setStyle (key, value) {
    if (this.style[key] === value) {
      return;
    }
    this.style[key] = value;
    const taskCenter = getTaskCenter(this.docId);
    if (taskCenter) {
      console.log('send updateStyle to task-center');
      const result = {};
      result[key] = value;
      taskCenter.send(
        'dom',
        { action: 'updateStyle' },
        [this.nodeId, result],
      );
    }
  }

  addEventListener(type, handler) {
    if (!this.event[type]) {
      const taskCenter = getTaskCenter(this.docId);
      if (taskCenter) {
        taskCenter.send(
          'dom',
          { action: 'addEvent' },
          [this.nodeId, type],
        );
      }
    }
    this.event[type] = handler;
  }

  removeEventListener(type) {
    if (this.event[type]) {
      delete this.event[type];
      const taskCenter = getTaskCenter(this.docId);
      if (taskCenter) {
        taskCenter.send(
          'dom',
          { action: 'removeEvent' },
          [this.nodeId, type],
        );
      }
    }
  }

  toJSON () {
    const result = {
      id: this.nodeId.toString(),
      type: this.type,
      attr: this.attr,
      style: this.style,
    };
    const event = Object.keys(this.event);

    if (event.length) {
      result.event = event;
    }

    if (this.children.length) {
      result.children = this.children.map((child) => child.toJSON());
    }
  
    return result;
  }
}
