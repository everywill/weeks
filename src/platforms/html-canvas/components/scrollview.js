import Component from './component';
import Konva from 'konva';

export default class ScrollView extends Component {
  constructor(data) {
    super(data);

    this.independentLayout = true;
  }

  get rootView() {
    if (!this.__rootView) {
      this.__rootView = new Konva.Layer();
    }
    return this.__rootView;
  }

  createView(style, attr) {
    const { backgroundColor } = style;
    
    return new Konva.Rect({
      id: this.id,
      fill: backgroundColor,
    });
  }

  insertSubview(childComponent, index) {
    this.__rootView.add(childComponent.view);
  }
}
