const computeLayout = require('../src/layout/layout');

const node = {
  style: {
    margin: 1,
    width: 30,
    borderWidth: 2,
    padding: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
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
      flex: 1,
    }
  }]
};

computeLayout(node);

console.log(JSON.stringify(node, null, 2));
