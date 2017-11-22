const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    path.join(__dirname,'client/index.js')
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif|svg)$/i, loader: 'file-loader' },
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.jpeg']
  },
};