export default {
  create: updateDomProps,
  update: updateDomProps,
};

const isStyle = key => key === 'style';

function updateDomProps(oldVnode, vnode) {
  const elm = vnode.elm;
  const { children: oldChildren, ...oldAttrs } = oldVnode.data || {};
  const { children, ...attrs } = vnode.data;
  const domProps = attrs.domProps || {};
  const oldDomProps = oldAttrs.domProps || {};

  for (let key in oldDomProps) {
    if (domProps.hasOwnProperty(key)) {
      if (isStyle(key)) {

      } else {
        elm.setAttr(key, null);
      }
    }
  }

  console.log('updateDomProps for domProps');
  console.log(domProps);

  for (let key in domProps) {
    if (isStyle(key)) {
      for (let name in domProps[key]) {
        elm.setStyle(name, domProps[key][name]);
      }
    } else {
      elm.setAttr(key, domProps[key]);
    }
  }
}
