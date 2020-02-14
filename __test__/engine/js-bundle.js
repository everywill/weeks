var body = document.createBody('view')
var view = document.createElement('view')
view.setStyle('width', 100);
view.setStyle('height', 100);
view.setStyle('backgroundColor', 'red');
const text= document.createElement('text');
text.setAttr('value', 'text node');
text.setStyle('color', 'white');
text.setStyle('fontSize', 12);
view.appendChild(text);
body.appendChild(view);
document.documentElement.appendChild(body);

console.log('bundle loaded')