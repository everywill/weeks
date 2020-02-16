import { TEXT_ELEMENT } from './element';

const isListener = name => name.startsWith('on');
const isStyle = name => name === 'style';
const isAttribute = name => !isStyle(name) && !isListener(name) && name !== 'children';


export function updateDomProperties(node, prevProps, nextProps) {
  // remove old attribute and eventListener
  Object.keys(prevProps).forEach(propName => {
    if (isListener(propName)) {
      const eventType = propName.toLowerCase().substring(2);
      node.removeEventListener(eventType, prevProps[propName]);
    }
    if (isAttribute(propName) && !nextProps.hasOwnProperty(propName)) {
      node.setAttr(propName, null);
    }
  });

  // update attribute and properties
  Object.keys(nextProps).forEach(propName => {
    if (isListener(propName)) {
      const eventType = propName.toLowerCase().substring(2);
      node.addEventListener(eventType, nextProps[propName]);
    }
    if (isStyle(propName)) {
      for (let key in nextProps[propName]) {
        node.setStyle(key, nextProps[propName][key]);
      }
    }
    if (isAttribute(propName)) {
      node.setAttr(propName, nextProps[propName]);
    }
  })
}

export function createDomElement(element) {
  return element.type === TEXT_ELEMENT
    ?  document.createTextNode(element.props.nodeValue)
    : document.createElement(element.type);
}

export function appendChild(node, childNode) {
  node.appendChild(childNode);
}

export function removeChild(node, childNode) {
  node.removeChild(childNode);
}

export function replaceChild(newChildNode, oldChildNode) {
  const parentNode = oldChildNode.parentNode;
  parentNode.replaceChild(newChildNode, oldChildNode);
}
