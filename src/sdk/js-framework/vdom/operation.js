const docMap = {};

export function addDoc (id, doc) {
  if (id) {
    docMap[id] = doc;
  }
};

export function getDoc (id) {
  return docMap[id];
};

export function getTaskCenter (id) {
  const doc = docMap[id];
  if (doc && doc.taskCenter) {
    return doc.taskCenter;
  }
};

let nextNodeRef = 0;
export function uniqueId () {
  return (nextNodeRef++).toString()
};

export function appendBody (doc, node) {
  const { documentElement } = doc;

  const children = documentElement.children;
  children.push(node);

  if (node.nodeType === 1) {
    node.docId = doc.id;
    node.ownerDocument = doc;
    node.parentNode = documentElement;
    linkParent(node, documentElement);
    
    sendBody(doc, node);
  }
}

export function setBody (doc, el) {
  el.depth = 1;
  delete doc.nodeMap[el.nodeId];
  doc.body = el;
}

export function linkParent (node, parent) {
  node.parentNode = parent;
  if (parent.docId) {
    node.docId = parent.docId;
    node.ownerDocument = parent.ownerDocument;
    node.ownerDocument.nodeMap[node.nodeId] = node;
    node.depth = parent.depth + 1;
  }

  node.children.forEach(child => {
    linkParent(child, node);
  });
};

export function insertIndex (target, list, newIndex, changeSibling) {
  const before = list[newIndex - 1];
  const after = list[newIndex];

  list.splice(newIndex, 0, target);

  if (changeSibling) {
    before && (before.nextSibling = target);
    target.previousSibling = before;
    target.nextSibling = after;
    after && (after.previousSibling = target);
  }
  return newIndex;
};

export function removeIndex (target, list, changeSibling) {
  const index = list.indexOf(target);
  if (index < 0) {
    return;
  }
  if (changeSibling) {
    const before = list[index - 1];
    const after = list[index + 1];
    before && (before.nextSibling = after);
    after && (after.previousSibling = before);
  }
  list.splice(index, 1);
}
