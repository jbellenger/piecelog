const webpack = require('webpack');
const path = require('path');
const alasqlSupport = require('./alasql-support');

// needed to prevent in-memory FS errors when running webpack-dev-server
const BUILD_DIR = path.resolve('./build/web');
const APP_DIR = './src/client';
const API_HOST = "'http://127.0.0.1:3000'";

const plugins = [new webpack.DefinePlugin({API_HOST: API_HOST})].concat(alasqlSupport.plugins);

module.exports = {
  entry: APP_DIR + '/main.js',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ]
  }
};
