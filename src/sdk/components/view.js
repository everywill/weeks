import Component from './component';
import Konva from 'konva-node';

export default class View extends Component {
  constructor(data) {
    super(data);
  }

  getView() {
    return new Konva.Rect({});
  }
}
