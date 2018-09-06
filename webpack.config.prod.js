const merge = require('webpack-merge');
const devConfig = require('./webpack.config');

module.exports = merge(devConfig, {
    devtool: 'none'
});