var body = document.createBody('view')
var view = document.createElement('view')
view.setStyle('width', 100);
view.setStyle('height', 100);
view.setStyle('backgroundColor', 'red');
view.setStyle('flexDirection', 'row');
view.setStyle('alignItems', 'center');
view.setStyle('justifyContent', 'center');

const text = document.createElement('text');
text.setAttr('value', 'text');
text.setStyle('color', 'white');
text.setStyle('fontSize', 12);

const scrollview = document.createElement('scrollview');
scrollview.setStyle('width', 50);
scrollview.setStyle('height', 50);
scrollview.setStyle('backgroundColor', 'blue');

const text2 = document.createElement('text');
text2.setAttr('value', 'text node');
text2.setStyle('color', 'white');
text2.setStyle('fontSize', 12);
text2.setStyle('position', 'absolute');
text2.setStyle('top', -5);

// const image = document.createElement('image');
// image.setStyle('width', 50);
// image.setStyle('height', 50);
// image.setAttr('src', 'http://cli.oss.aliyuncs.com/2015/04/22/21f5deae6515c6c8a8834c5a65506971.jpg');
scrollview.appendChild(text2);

body.appendChild(text);
body.appendChild(view);
body.appendChild(scrollview);

document.documentElement.appendChild(body);

setTimeout(() => {
  body.removeChild(text);
  // text.setAttr('value', 'changed content');
  // view.setStyle('backgroundColor', 'yellow');
}, 300);


console.log('bundle loaded');