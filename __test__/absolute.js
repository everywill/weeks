const computeLayout = require('../src/layout/layout');

const node = {
  style: {
    margin: 4,
    borderWidth: 20,
    padding: 8,
  },
  children: [{
    style: {
      margin: 5,
      borderWidth: 3,
      padding: 10,
      position: 'absolute',
    }
  }],
};

computeLayout(node);

console.log(JSON.stringify(node, null, 2));