import Element from './element';

export default class View extends Element {
  constructor(data) {
    super(data);
    console.log('View created')
  }
}
