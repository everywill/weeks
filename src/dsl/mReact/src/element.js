export const TEXT_ELEMENT = 'TEXT ELEMENT';

export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  let rawChildren = (hasChildren ? [].concat(...args) : []).filter(c => Boolean(c));
  if (rawChildren.length === 1 && typeof rawChildren[0] === 'string') {
    props.value = rawChildren[0];
    rawChildren = [];
  }
  props.children = rawChildren;

  return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}
