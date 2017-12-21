const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      // Compression specific options
      compress: {
        // remove warnings
        warnings: false,
        // Drop console statements
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'server/public/index.html'),
      filename: 'index.html'
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
    extensions: ['.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.jpeg']
  },
};
