import Component from './component';
import Konva from 'konva';

export default class Image extends Component {
  constructor(data) {
    super(data);
  }

  createView(style, attr) {
    const { src } = attr;
    const { width, height } = style;

    const img = new Konva.window.Image(width, height);
    const image = new Konva.Image({
      id: this.id,
    })

    img.onload = () => {
      console.log('image loaded');
      image.image(img);
    };
    img.src = src;
    
    return image;
  }
}
