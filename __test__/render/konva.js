const fs = require('fs');
const path = require('path');
// relative path here
// but you will need just require('konva-node');
var Konva = require('konva-node');

// Create stage. Container parameter is not required in NodeJS.
var stage = new Konva.Stage({
  width: 200,
  height: 200
});

var layer1 = new Konva.Layer({
  clip: {
    x: 75,
    y: 75,
    width: 100,
    height: 100,
  }
});

var layer2 = new Konva.Layer({});
var img = new Konva.window.Image();
var image = new Konva.Image({
 width: 50,
 height: 50,
 x: 150, 
 y: 150,
})
img.onload = function() {
  image.image(img);
}
img.src = 'http://cli.oss.aliyuncs.com/2015/04/22/21f5deae6515c6c8a8834c5a65506971.jpg'
stage.add(layer1);
stage.add(layer2);
var rect = new Konva.Rect({
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  fill: 'white'
});
var text = new Konva.Text({
  fill: 'red'
});
layer1.add(image);
layer2.add(rect).add(text);

// layer.draw();

text.text('Generated inside node js')

// After tween we want to convert stage to dataURL
setTimeout(function() {
  stage.toDataURL({
    callback: function(data) {
      // Then add result to stage
      
      var base64Data = data.replace(/^data:image\/png;base64,/, '');
      fs.writeFile(path.join(__dirname + '/out.png') , base64Data, 'base64', function(err) {
        err && console.log(err);
        console.log('See out.png');
      });

    }
  });
}, 1050);