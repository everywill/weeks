const computeLayout = require('../src/layout/layout');

const node = {
  style: {
    margin: 1,
    width: 24,
    borderWidth: 2,
    padding: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  children: [{
    style: {
      margin: 2,
      borderWidth: 3,
      padding: 4,
    }
  }, {
    style: {
      margin: 3,
      borderWidth: 2,
      padding: 1,
    }
  }]
};

computeLayout(node);

console.log(JSON.stringify(node, null, 2));
