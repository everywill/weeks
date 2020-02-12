var fs = require('fs');

// relative path here
// but you will need just require('konva-node');
var Konva = require('konva-node');

// Create stage. Container parameter is not required in NodeJS.
var stage = new Konva.Stage({
  width: 100,
  height: 100
});

var layer = new Konva.Layer();
stage.add(layer);
var rect = new Konva.Rect({
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  fill: 'white'
});
var text = new Konva.Text({
  text: 'Generated inside node js',
  x: 20,
  y: 20,
  fill: 'black'
});
layer.add(rect).add(text);
// layer.draw();
stage.setSize({
  width: 200,
  height: 200
});

text.remove();

// check tween works


// After tween we want to convert stage to dataURL
setTimeout(function() {
  stage.toDataURL({
    callback: function(data) {
      // Then add result to stage
      
      var base64Data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFile('./out.png', base64Data, 'base64', function(err) {
        err && console.log(err);
        console.log('See out.png');
      });
      // now try to create image from url
      Konva.Image.fromURL(data, () => {
        console.log('image loaded');
        // shoul'd throw
      });

    }
  });
}, 1050);