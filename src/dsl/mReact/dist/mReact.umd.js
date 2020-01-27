(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.mReact = {}));
}(this, (function (exports) { 'use strict';

  const TEXT_ELEMENT = 'TEXT ELEMENT';

  function createElement(type, config, ...args) {
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

  class Component {
    constructor(props) {
      this.props = props || {};
      this.state = this.state || {};
    }

    setState(partialState) {
      scheduleClassUpdate(this, partialState);
    }
  }

  Component.prototype.isReactComponent = true;

  function createInstance(wipFiber) {
    const instance = new wipFiber.type(wipFiber.props);
    instance.__fiber = wipFiber;
    return instance;
  }

  const isListener = name => name.startsWith('on');
  const isAttribute = name => !isListener(name) && name !== 'children';

  function updateDomProperties(node, prevProps, nextProps) {
    // remove old attribute and eventListener
    Object.keys(prevProps).forEach(propName => {
      if (isListener(propName)) {
        const eventType = propName.toLowerCase().substring(2);
        node.removeEventListener(eventType, prevProps[propName]);
      }
      if (isAttribute(propName) && !nextProps.hasOwnProperty(propName)) {
        node[propName] = null;
      }
    });

    // update attribute and properties
    Object.keys(nextProps).forEach(propName => {
      if (isListener(propName)) {
        const eventType = propName.toLowerCase().substring(2);
        node.addEventListener(eventType, nextProps[propName]);
      }
      if (isAttribute(propName)) {
        node[propName] = nextProps[propName];
      }
    });
  }

  function createDomElement(element) {
    return element.type === TEXT_ELEMENT
      ?  document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);
  }

  function appendChild(node, childNode) {
    node.appendChild(childNode);
  }

  function removeChild(node, childNode) {
    node.removeChild(childNode);
  }

  // effect tags
  const PLACEMENT = 1;
  const DELETION = 2;
  const UPDATE = 3;

  function isClass(type) {
    return (
      Boolean(type.prototype) &&
      Boolean(type.prototype.isReactComponent)
    );
  }

  function cloneChildFibers(parentFiber) {
    const oldParentFiber = parentFiber.alternate;
    if (!oldParentFiber.child) {
      return;
    }

    let oldChildFiber = oldParentFiber.child;
    let prevFiber = null;

    while(oldChildFiber) {
      const newChildFiber = {
        type: oldChildFiber.type,
        tag: oldChildFiber.tag,
        stateNode: oldChildFiber.stateNode,
        props: oldChildFiber.props,
        partialState: oldChildFiber.partialState,
        alternate: oldChildFiber,
        parent: parentFiber,
      };

      if (prevFiber) {
        prevFiber.sibling = newChildFiber;
      } else {
        parentFiber.child = newChildFiber;
      }

      prevFiber = newChildFiber;
      oldChildFiber = oldChildFiber.sibling;
    }
  }

  function updateClassComponent(wipFiber) {
    let instance = wipFiber.stateNode;
    if (!instance) {
      // first-time rendering
      instance = wipFiber.stateNode = createInstance(wipFiber);
      if (instance.componentWillMount) {
        instance.componentWillMount();
      }
    }
    else if (wipFiber.props === instance.props && !wipFiber.partialState) {
      cloneChildFibers(wipFiber);
      return;
    }
    // else {
    //   // subsequent rendering
    //   if (instance.componentWillReceiveProps) {
    //     instance.componentWillReceiveProps(wipFiber.props);
    //   }
    //   let shouldUpdate = true;
    //   if (instance.shouldComponentUpdate) {
    //     shouldUpdate = instance.shouldComponentUpdate(
    //       wipFiber.props,
    //       Object.assign({}, instance.state, wipFiber.partialState)
    //     );
    //   }
    //   if (shouldUpdate) {
    //     if (instance.componentWillUpdate) {
    //       instance.componentWillUpdate(wipFiber.props);
    //     }
    //   } else {
    //     cloneChildFibers(wipFiber);
    //     return;
    //   }

    instance.props = wipFiber.props;
    instance.state = Object.assign({}, instance.state, wipFiber.partialState);
    wipFiber.partialState = null;

    const newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
  }

  let currentWipFiber = null;
  let hookIndex = null;

  function updateFunctionComponent(wipFiber) {
    currentWipFiber = wipFiber;
    hookIndex = 0;
    wipFiber.hooks = [];

    const newChildElements = wipFiber.type(wipFiber.props);
    reconcileChildrenArray(wipFiber, newChildElements);
  }

  function useState(initial) {
    const oldHook =
      currentWipFiber.alternate &&
      currentWipFiber.alternate.hooks &&
      currentWipFiber.alternate.hooks[hookIndex];

    const hook = {
      state: oldHook ? oldHook.state : initial,
      queue: [],
    };

    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
      hook.state = action(hook.state);
    });

    const setState = action => {
      if (typeof action !== 'function') {
        action = function() {return action;};
      }
      hook.queue.push(action);
      scheduleHooksUpdate(currentWipFiber);
    };

    currentWipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
  }

  function updateHostComponent(wipFiber) {
    if (!wipFiber.stateNode) {
      wipFiber.stateNode = createDomElement(wipFiber);
    }
    const prevProps = wipFiber.alternate && wipFiber.alternate.props;
    const props = wipFiber.props;

    updateDomProperties(wipFiber.stateNode, prevProps || [], props || []);

    const newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
  }

  function reconcileChildrenArray(wipFiber, newChildElements) {
    const elements = arrify(newChildElements);

    let index = 0;
    let oldChildFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    let newChildFiber = null;

    while (index < elements.length || oldChildFiber) {
      const prevChildFiber = newChildFiber;
      const element = index < elements.length && elements[index];
      const sameType = oldChildFiber && element && oldChildFiber.type === element.type;

      if (sameType) {
        // build newChildFiber based on oldChildFiber
        newChildFiber = {
          type: oldChildFiber.type,
          tag: oldChildFiber.tag,
          stateNode: oldChildFiber.stateNode,
          props: element.props,
          parent: wipFiber,
          alternate: oldChildFiber,
          partialState: oldChildFiber.partialState,
          effectTag: UPDATE,
        };
      }

      if (!sameType && element) {
        // type changes and there is a element, place a newChildFiber
        newChildFiber = {
          type: element.type,
          tag: typeof element.type === 'string'
            ? HOST_COMPONENT : (isClass(element.type) ? CLASS_COMPONENT : FUNCTION_COMPONENT),
          props: element.props,
          parent: wipFiber,
          effectTag: PLACEMENT,
        };
      }

      if (!sameType && oldChildFiber) {
        // type changes and there was a oldChildFiber
        oldChildFiber.effectTag = DELETION;
        wipFiber.effects = wipFiber.effects || [];
        wipFiber.effects.push(oldChildFiber);
      }

      if (index === 0) {
        // link first newChildFiber to parent
        wipFiber.child = newChildFiber;
      } else if (prevChildFiber && element) {
        // link siblings
        prevChildFiber.sibling = newChildFiber;
      }

      if (oldChildFiber) {
        oldChildFiber = oldChildFiber.sibling;
      }

      index ++;
    }
  }

  function arrify(val) {
    return !val ? [] : Array.isArray(val) ? val : [val];
  }

  const HOST_COMPONENT = 'host';
  const CLASS_COMPONENT = 'class';
  const FUNCTION_COMPONENT = 'function';
  const HOST_ROOT = 'root';

  const ENOUGH_TIME = 1;

  const updateQueue = [];

  let nextUnitOfWork = null;
  let pendingCommit = null;

  function performWork(deadline) {
    workLoop(deadline);
    // start another requestIdleCallback if any work left
    if (nextUnitOfWork || updateQueue.length > 0) {
      requestIdleCallback(performWork);
    }
  }

  function workLoop(deadline) {
    // work in one idle
    if (!nextUnitOfWork) {
      resetNextUnitOfWork();
    }

    let shouldYield = false;

    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < ENOUGH_TIME;
    }

    // should not be interrupted
    if (pendingCommit) {
      commitAllWork(pendingCommit);
    }
  }

  function performUnitOfWork(wipFiber) {
    // build children of this wipFiber
    beginWork(wipFiber);
    if (wipFiber.child) {
      return wipFiber.child;
    }


    let uow = wipFiber;
    while (uow) {
      // complete current wipFiber when no child built
      completeWork(uow);
      if (uow.sibling) {
        return uow.sibling;
      }
      uow = uow.parent;
    }
  }

  function completeWork(fiber) {
    if (fiber.tag === CLASS_COMPONENT) {
      fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
      const childEffects = fiber.effects || [];
      const thisEffect = fiber.effectTag !== null ? [fiber] : [];
      const parentEffects = fiber.parent.effects || [];

      fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
      pendingCommit = fiber;
    }
  }

  function beginWork(wipFiber) {
    if (wipFiber.tag === CLASS_COMPONENT) {
      updateClassComponent(wipFiber);
    } else if (wipFiber.tag === FUNCTION_COMPONENT){
      updateFunctionComponent(wipFiber);
    } else {
      updateHostComponent(wipFiber);
    }
  }

  function commitAllWork(fiber) {
    fiber.effects.forEach(f => commitWork(f));
    fiber.stateNode._rootContainerFiber = fiber;
    pendingCommit = null;
  }

  function commitWork(fiber) {
    if (fiber.tag === HOST_ROOT) {
      return;
    }

    let domParentFiber = fiber.parent;
    while(domParentFiber.tag === CLASS_COMPONENT || domParentFiber.tag === FUNCTION_COMPONENT) {
      // find the nearest dom
      domParentFiber = domParentFiber.parent;
    }

    const domParent = domParentFiber.stateNode;

    if (fiber.effectTag === PLACEMENT) {
      commitPlacement(fiber, domParent);
    } else if (fiber.effectTag === UPDATE) {
      commitUpdate(fiber);
    } else if (fiber.effectTag === DELETION) {
      commitDeletion(fiber, domParent);
    }
  }

  function commitPlacement(fiber, domParent) {
    if (fiber.tag === HOST_COMPONENT) {
      appendChild(domParent, fiber.stateNode);
    } else if (fiber.tag === CLASS_COMPONENT) {
      const instance = fiber.stateNode;
      if (instance.componentDidMount) {
        instance.componentDidMount();
      }
    }
  }

  function commitUpdate(fiber) {
    if (fiber.tag === HOST_COMPONENT) {
      updateDomProperties(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.tag === CLASS_COMPONENT) {
      const instance = fiber.stateNode;
      if (instance.componentDidUpdate) {
        instance.componentDidUpdate();
      }
    }
  }

  function commitDeletion(fiber, domParent) {
    let node = fiber;
    while (true) {
      if (node.tag !== HOST_COMPONENT) {
        node = node.child;
        if (node.tag === CLASS_COMPONENT) {
          const instance = node.stateNode;
          if (node.componentWillUnmount) {
            node.componentWillUnmount();
          }
        }
        continue;
      }
      removeChild(domParent, node.stateNode);

      while (node !== fiber && !node.sibling) {
        node = node.parent;
      }

      if (node === fiber) {
        return;
      }

      node = node.sibling;
    }
  }

  function resetNextUnitOfWork() {
    const update = updateQueue.shift();

    if (!update) {
      return;
    }

    if (update.partialState) {
      update.instance.__fiber.partialState = update.partialState;
    }

    const root =
      update.from === HOST_ROOT
        ? update.dom._rootContainerFiber
        : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
      tag: HOST_ROOT,
      stateNode: update.dom || root.stateNode,
      props: update.newProps || root.props,
      alternate: root,
    };
  }

  function getRoot(fiber) {
    let node = fiber;
    while (node.parent) {
      node = node.parent;
    }
    return node;
  }

  function render(elements, container) {
    updateQueue.push({
      from: HOST_ROOT,
      dom: container,
      newProps: { children: elements }
    });

    requestIdleCallback(performWork);
  }

  function scheduleClassUpdate(instance, partialState) {
    updateQueue.push({
      from: CLASS_COMPONENT,
      instance,
      partialState,
    });

    requestIdleCallback(performWork);
  }

  function scheduleHooksUpdate(fiber) {
    updateQueue.push({
      from: FUNCTION_COMPONENT,
      instance: {__fiber: fiber},
    });

    requestIdleCallback(performWork);
  }

  var index = {
    createElement,
    render,
    Component,
    useState,
  };

  exports.Component = Component;
  exports.createElement = createElement;
  exports.default = index;
  exports.render = render;
  exports.useState = useState;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
