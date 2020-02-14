import Component from './component';
import Konva from 'konva-node';

export default class View extends Component {
  constructor(data) {
    super(data);
  }

  createView() {
    return new Konva.Rect({
      id: this.id,
    });
  }

  insertSubview(childComponent, index) {
    this.view.getParent().add(childComponent.view);
  }
}
