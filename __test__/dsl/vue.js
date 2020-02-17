import mVue from '../../dist/mVue.es';

const body = document.createBody('view');
const view = document.createElement('view');

body.appendChild(view);
document.documentElement.appendChild(body);

const myComponent = mVue.extend({
  template: `<view style="{width: 100, height: 100, backgroundColor: 'red'}"></view>`,
});

new mVue({
  el: view,
  components: {
    'my-component': myComponent,
  },
  template: '<my-component></my-component>',
  data: {
    style: {
      width: 100,
      height: 100,
    }
  }
});
