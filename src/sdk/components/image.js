import Component from './component';
import Konva from 'konva-node';

export default class Image extends Component {
  constructor(data) {
    super(data);
  }

  getView() {
    return new Konva.Image({
      image: new Konva.window.Image()
    })
  }
}
