const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssStractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

/** @type {import('webpack').Configuration} */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
    clean: true
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
      rules: [
          {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
            test: /\.css|.styl$/i,
            use: [
              MiniCssStractPlugin.loader, 
              'css-loader',
              'stylus-loader'
            ]
          },
          {
            test:  /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
          },
          {
            test: /\.(woff|woff2)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[hash][ext][query]',
            },
          },
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          inject: true,
          template: './public/index.html',
          filename: './index.html'
      }),
      new MiniCssStractPlugin({
        filename: 'assets/[name].[contenthash].css'
      }),
      new Dotenv(),
  ],
  optimization: {
    minimize: true,
  }
};