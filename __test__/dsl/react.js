import mReact, { render } from '../../dist/mReact.es';

const body = document.createBody('view');
const view = document.createElement('view');

body.appendChild(view);
document.documentElement.appendChild(body);

class Test extends mReact.Component {
  render() {
    return (
      <view style={{ width: 100, height: 100, backgroundColor: 'red' }}>
        <text>123</text>
      </view>
    );
  }
}
 
render(<Test />, view);
