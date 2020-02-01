const xRender = require('../../../dist/js-framework.umd');

code = `
  var body = document.createBody()
  var div = document.createElement('div')
  div.setStyle('color', 'red')
  var span = document.createElement('span')
  span.setAttr('value', 'text node')
  div.appendChild(span)
  body.appendChild(div)
  document.documentElement.appendChild(body)
  // console.log(JSON.stringify(body, null, 2))
`;

xRender.createInstance(Date.now(), code);