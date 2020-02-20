const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

console.log(`__dirname: ${__dirname}`);
console.log(`entry point: ${path.join(__dirname + '/../dsl/react.js')}`)

module.exports = {
  mode: 'production',
  // entry: './__test__/dsl/react.js',
  entry: {
    'js-bundle': path.join(__dirname + '/../dsl/react.js'),
    'js-framework': path.join(__dirname + '/../../src/js-framework/index.js'),
    main: path.join(__dirname + '/index.js'),
  },
  output: {
    path: path.join(__dirname, '/../../dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, '/../../dist')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [ 
                    "@babel/preset-env",
                    { "targets": { "node": "current" } }
                  ]
                ],
                plugins: [
                  [
                    "@babel/transform-react-jsx",
                    { "pragma": "mReact.createElement" }
                  ]
                ]
              }
            }
        }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      template: path.join(__dirname + '/index.html'),
      favicon: path.join(__dirname + '/favicon.ico'),
      chunks: ['main']
    }),
  ],
  externals: {
    'worker_threads': 'Worker'
  }
};
