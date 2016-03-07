const webpack = require('webpack');
const path = require('path');

// needed to prevent in-memory FS errors when running webpack-dev-server
const BUILD_DIR = path.resolve('./build/web');
const APP_DIR = './src/client';
const API_HOST = "'http://127.0.0.1:3000'";

module.exports = {
  entry: APP_DIR + '/main.js',
  devtool: 'eval-source-map',
  output: {
    path: BUILD_DIR,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({API_HOST: API_HOST}),
  ],
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
