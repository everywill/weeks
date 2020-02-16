import mReact, { render } from '../../dist/mReact.es';

const body = document.createBody('view');
const view = document.createElement('view');

body.appendChild(view);
document.documentElement.appendChild(body);

render(<view/>, view);
