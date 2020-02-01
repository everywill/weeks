const fs = require('fs');
const path = require('path');
const { xEngine, xInstance } = require('../../dist/x-render.umd');

xEngine.initSDKEnvironment();
const ins = new xInstance();

fs.readFile(path.join(__dirname + '/js-bundle.js'), function(error, data) {
  if (error) throw error;
  ins.renderWithBundleString(data.toString());
});

