import Component from './component';
import Konva from 'konva-node';

export default class Text extends Component {
  constructor(data) {
    super(data);
  }

  getView() {
    return new Konva.Text({
      text: 'hello'
    });
  }
}
