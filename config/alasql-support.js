'use strict';

const webpack = require('webpack');

const ignoreModules = [
  'forever-agent',
  'fs',
  'har-validator',
  'mime-db',
  'path',
  'request',
  'stream-browserify',
  'tough-cookie',
  'tunnel-agent',
  'vertx',
  'xls',
  'xlsjs',
  'xlsx',
];

const ignorePlugins = ignoreModules.map((mod) => {
  const regex = RegExp('^' + mod + '$');
  return new webpack.IgnorePlugin(regex);
});

module.exports.plugins = ignorePlugins;
