const path = require('path');

const BUILD_DIR = path.resolve('./build/web');
const APP_DIR = './src/client';

module.exports = {
  entry: APP_DIR + '/main.js',
  devtool: 'eval-source-map',
  output: {
    path: BUILD_DIR,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: 'node_modules',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ]
  }
};
