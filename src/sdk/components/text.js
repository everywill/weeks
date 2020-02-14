import Component from './component';
import Konva from 'konva-node';

export default class Text extends Component {
  constructor(data) {
    super(data);

    this.cssNode.measure = this.getViewSize.bind(this);
  }

  createView(style, attr) {
    const { fontSize = 12, color } = style;
    const { value } = attr;
    
    return new Konva.Text({
      id: this.id,
      fontSize,
      fill: color,
      text: value,
    });
  }

  getViewSize() {
    return this.view.size();
  }
}
