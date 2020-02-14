var body = document.createBody('view')
var div = document.createElement('view')
div.setStyle('width', 100);
div.setStyle('height', 100)
div.setStyle('backgroundColor', 'red')
// var span = document.createElement('text')
// span.setAttr('value', 'text node')
// div.appendChild(span)
body.appendChild(div)
document.documentElement.appendChild(body)

// document.taskCenter.send('dom', { action: 'addEvent' }, ['chongya']);

console.log('bundle loaded')