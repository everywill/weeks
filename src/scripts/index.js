import framework from './framework';
import { init, config } from '../sdk/js-runtime/index';

global = global || globalThis;

config.framework = framework;
const globalMethods = init(config);

for (let methodName in globalMethods) {
  global[methodName] = (...args) => {
    const ret = globalMethods[methodName](...args);
    if (ret instanceof Error) {
      console.error(ret.toString());
    }
    return ret;
  }
}
