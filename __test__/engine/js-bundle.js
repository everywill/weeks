var body = document.createBody('view')
var div = document.createElement('view')
// div.setStyle('color', 'red')
var span = document.createElement('text')
// span.setAttr('value', 'text node')
div.appendChild(span)
body.appendChild(div)
document.documentElement.appendChild(body)

// document.taskCenter.send('dom', { action: 'addEvent' }, ['chongya']);

console.log('bundle loaded')