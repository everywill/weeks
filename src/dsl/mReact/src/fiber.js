import { updateHostComponent, updateClassComponent, updateFunctionComponent } from './reconciler';
import { PLACEMENT, UPDATE, DELETION } from './reconciler';
import { appendChild,removeChild, updateDomProperties } from './dom-utils';

export const HOST_COMPONENT = 'host';
export const CLASS_COMPONENT = 'class';
export const FUNCTION_COMPONENT = 'function';
export const HOST_ROOT = 'root';

const ENOUGH_TIME = 1;

export const updateQueue = [];

let nextUnitOfWork = null;
let pendingCommit = null;

export function performWork(deadline) {
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
    uow = uow.parent
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
  }
}

function getRoot(fiber) {
  let node = fiber;
  while (node.parent) {
    node = node.parent;
  }
  return node;
}
