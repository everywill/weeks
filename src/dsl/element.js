export const TEXT_ELEMENT = 'TEXT ELEMENT';

export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => Boolean(c) )
    .map(c => c instanceof Object ? c : createTextElement(c));

    return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}


