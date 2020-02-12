import Component from './component';
import Konva from 'konva-node';

export default class View extends Component {
  constructor(data) {
    super(data);
    this.__view = new Konva.Rect({
      id: this.id,
      width: 100,
      height: 100,
      fill: 'white'
    });
  }

  get view() {
    return this.__view;
  }

  insertSubview(childComponent, index) {
    this.view.getParent().add(childComponent.view);
  }
}
