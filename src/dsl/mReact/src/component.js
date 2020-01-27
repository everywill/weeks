import { scheduleClassUpdate } from './render';

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};
  }

  setState(partialState) {
    scheduleClassUpdate(this, partialState);
  }
}

Component.prototype.isReactComponent = true;

export function createInstance(wipFiber) {
  const instance = new wipFiber.type(wipFiber.props);
  instance.__fiber = wipFiber;
  return instance;
}
