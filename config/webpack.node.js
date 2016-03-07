const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => x !== '.bin')
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const BUILD_DIR = './build/node';
const APP_DIR = './src/server';

module.exports = {
  entry: APP_DIR + '/dev-main.js',
  target: 'node',
  devtool: 'sourcemap',
  externals: nodeModules,
  output: {
    path: BUILD_DIR,
    filename: 'main.js'
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
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
      }
    ]
  }
};
