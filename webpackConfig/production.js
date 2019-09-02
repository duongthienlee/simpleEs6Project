const webpack = require('webpack');
//const _ = require('lodash');
const merge = require('webpack-merge');
const base = require('./base');
const productionConfig = {
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

module.exports = merge(base, productionConfig);
