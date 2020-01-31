const xRender = require('../../../dist/x-render.umd');

code = `
  var body = document.createBody()
  var div = document.createElement('div')
  div.setStyle('color', 'red')
  var span = document.createElement('span')
  span.setAttr('value', 'text node')
  div.appendChild(span)
  body.appendChild(div)
`;

xRender.createInstance(Date.now(), code);