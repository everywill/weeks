const path = require('path');
const { Worker } = require('worker_threads');
const worker = new Worker(path.join(__dirname, '../../dist/js-framework.umd.js'));

worker.postMessage({cmd: 'invokeMethod', data: { 
  name: 'registerMethod', 
  args: ['add', ['a', 'b', 'return a + b;']],
}});

worker.on('message', (message) => {
  console.log(`parent receives ${message}`);
})