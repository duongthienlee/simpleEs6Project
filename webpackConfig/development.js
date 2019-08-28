const webpack = require('webpack');
const _ = require('lodash');
const base = require('./base');

const devConfig = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    proxy: {
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = _.merge(base, devConfig);
