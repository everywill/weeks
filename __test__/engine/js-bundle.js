// var body = document.createBody()
// var div = document.createElement('div')
// div.setStyle('color', 'red')
// var span = document.createElement('span')
// span.setAttr('value', 'text node')
// div.appendChild(span)
// body.appendChild(div)
// document.documentElement.appendChild(body)

document.taskCenter.send('dom', { action: 'addEvent' }, ['chongya']);

console.log('bundle loaded')