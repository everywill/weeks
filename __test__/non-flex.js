const computeLayout = require('../src/layout/layout');

// // alignItem: stretch; parentNode: no provided height
// const node = {
//   style: {
//     margin: 4,
//     borderWidth: 2,
//     padding: 8,
//     flexDirection: 'column',
//     alignItems: 'stretch'
//   },
//   children: [{
//     style: {
//       margin: 5,
//       borderWidth: 3,
//       padding: 10,
//     }
//   }, {
//     style: {
//       margin: 1,
//       borderWidth: 1,
//       padding: 11,
//     }
//   }]
// };

// alignItem: stretch; parentNode: provided height
const node = {
  style: {
    margin: 4,
    borderWidth: 2,
    padding: 8,
    height: 100,
    width: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  children: [{
    style: {
      margin: 5,
      borderWidth: 3,
      padding: 10,
    }
  }, {
    style: {
      margin: 1,
      borderWidth: 1,
      padding: 11,
    }
  }]
};

computeLayout(node);

console.log(JSON.stringify(node, null, 2));
