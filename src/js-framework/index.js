// eliminate differences between node and web
global = global || globalThis;
let parentPort;

if (global.hasOwnProperty('onmessage')) {
  // in web
  parentPort = {
    on(type, cb) {
      global.onmessage = (e) => {
        cb(e.data);
      };
    },
    postMessage(data) {
      global.postMessage(data);
    }
  };
} else {
  parentPort = require('worker_threads').parentPort;
}

global.parentPort = parentPort;

parentPort.on('message', ({cmd, data}) => {
  // console.log(`js-framework: received message, cmd: ${cmd}\n`);
  // console.log('data:\n');
  // console.log(JSON.stringify(data, null, 2));
  // console.log('---');
  switch (cmd) {
    case 'invokeMethod':
      const { name, args } = data;
      try {
        
        global[name](...args);
      } catch(err) {
        console.log(`invokeMethod ${name}`);
        console.log(args);
        console.error(err);
      }
  }
});

import framework from './frameworks/vanilla';
import { init, config } from './runtime/index';

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
