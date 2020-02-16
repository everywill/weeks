const fs = require('fs');
const path = require('path');
const { xEngine, xInstance } = require('../../dist/x-render.umd');
var Konva = require('konva-node');

const frameworkBundle = path.join(__dirname + '../../../dist/js-framework.umd.js');

xEngine.initSDKEnvironment(frameworkBundle);

const ins = new xInstance();

ins.frame = new Konva.Stage({
  width: 100,
  height: 200
});

ins.rootView = new Konva.Layer({
  id: 'root',
});

ins.frame.add(ins.rootView);

ins.draw = () => {
  ins.frame.toDataURL({
    callback: function(data) {
      // Then add result to stage
      
      var base64Data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFile(path.join(__dirname + '/out.png'), base64Data, 'base64', function(err) {
        // console.log(base64Data);
        err && console.log(err);
        console.log('See out.png');
      });
      // // now try to create image from url
      // Konva.Image.fromURL(data, () => {
      //   console.log('image loaded');
      //   // shoul'd throw
      // });

    }
  });
}

fs.readFile(path.join(__dirname + '/bundle.js'), function(error, data) {
  if (error) throw error;
  ins.renderWithBundleString(data.toString());
});
