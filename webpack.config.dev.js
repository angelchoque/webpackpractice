const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssStractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const TerserPlugin = requiere('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')


/** @type {import('webpack').Configuration} */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]"
  },
  mode: 'development',
  watch: true,
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
          // {
          //   test: /\.(woff|woff2)$/,
          //   use: {
          //     loader: 'url-loader',
          //     options: {
          //       limit: 10000,
          //       mimetype: "aplication/font-woff",
          //       name: "[name].[ext]",
          //       outputPath: "./assets/fonts/",
          //       publicPath: "./assets/fonts/",
          //       esModule: false,
          //     }
          //   }
          // }
          {
            test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
            type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
            generator: {
              filename: 'assets/fonts/[hash][ext][query]',
              // filename: 'assets/fonts/[name].[contenthash].[ext]',  // Directorio de salida
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
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, "src", "assets/images"),
      //       to: "assets/images"
      //     }
      //   ]
      // }),
      new Dotenv(),
  ],
};