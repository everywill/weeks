const computeLayout = require('../src/layout/layout');

const node = {
  style: {
    margin: 4,
    borderWidth: 2,
    padding: 8,
    flexDirection: 'column',
  },
  children: [{
    style: {
      margin: 5,
      borderWidth: 3,
      padding: 10,
      position: 'absolute',
      left: 10,
    }
  }, {
    style: {
      margin: 1,
      borderWidth: 1,
      padding: 11,
      position: 'absolute',
    }
  }]
};

computeLayout(node);

console.log(JSON.stringify(node, null, 2));
