const docMap = {};

export function addDoc (id, doc) {
  if (id) {
    docMap[id] = doc;
  }
};

export function getListener (id) {
  const doc = docMap[id];
  if (doc && doc.listener) {
    return doc.listener;
  }
};

export function getTaskCenter (id) {
  const doc = docMap[id];
  if (doc && doc.taskCenter) {
    return doc.taskCenter;
  }
};
