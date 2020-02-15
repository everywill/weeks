const config = {};
const instanceMap = {};

function init (cfg) {
  config.Document = cfg.Document;
  config.Element = cfg.Element;
}

function createInstance(id, code) {

  const document = new config.Document(id);

  instanceMap[id] = document;

  const globalObjects = {
    document,
  };
  const globalKeys = [];
  const globalValues = [];

  for (const key in globalObjects) {
    globalKeys.push(key);
    globalValues.push(globalObjects[key]);
  }
  globalKeys.push(code);

  const result = new Function(...globalKeys);
  return result(...globalValues);
}

export default {
  createInstance,
  init,
}
