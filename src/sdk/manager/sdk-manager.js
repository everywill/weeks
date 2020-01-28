import BridgeManager from './bridge-manager';

const instanceMap = {};

export default class SDKManager {}

SDKManager.bridgeMgr = new BridgeManager();

SDKManager.instanceForId = function (id) {
  return instanceMap[id];
}

SDKManager.removeInstanceforId = function (id) {
  delete instanceMap[id];
}

SDKManager.storeInstance = function (instance, id) {
  instanceMap[id] = instance;
}