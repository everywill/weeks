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
      width: 'auto',
      height: 'auto',
    });
  }

  updateAttr(attr) {
    const { value } = attr;
    this.attr = Object.assign(this.attr, attr);

    if (value !== undefined) {
      this.view.text(value);
      // this.view.draw();
      this.setNeedsLayout();
    }
  }

  getViewSize() {
    const size = this.view.size();
    const text = this.view.text();
    console.log(`measure size of ${text}:`);
    console.log(size);
    return size;
  }
}
