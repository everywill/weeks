var body = document.createBody('view')
var view = document.createElement('view')
view.setStyle('width', 100);
view.setStyle('height', 100);
view.setStyle('backgroundColor', 'red');
view.setStyle('flexDirection', 'row');
view.setStyle('alignItems', 'center');
view.setStyle('justifyContent', 'center');
const text= document.createElement('text');
text.setAttr('value', 'text');
text.setStyle('color', 'white');
text.setStyle('fontSize', 12);

const image = document.createElement('image');
image.setStyle('width', 50);
image.setStyle('height', 50);
image.setAttr('src', 'http://cli.oss.aliyuncs.com/2015/04/22/21f5deae6515c6c8a8834c5a65506971.jpg');

view.appendChild(image);
view.appendChild(text);
body.appendChild(view);

document.documentElement.appendChild(body);

console.log('bundle loaded')