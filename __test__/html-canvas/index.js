import { xEngine, xInstance } from '../../src/platforms/html-canvas/index';
const Konva = require('konva');

const frameworkBundle = '/js-framework.js';

xEngine.initSDKEnvironment(frameworkBundle);

const ins = new xInstance();

ins.frame = new Konva.Stage({
  width: 100,
  height: 200,
  container: 'app', 
});

ins.rootView = new Konva.Layer({
  id: 'root',
});

ins.frame.add(ins.rootView);

ins.draw = () => {
  ins.frame.draw();
}

fetch('js-bundle.js').then((res) => res.text()).then((text) => {
  ins.renderWithBundleString(text);
});

// fs.readFile(path.join(__dirname + '/js-bundle.js'), function(error, data) {
//   if (error) throw error;
//   ins.renderWithBundleString(data.toString());
// });
