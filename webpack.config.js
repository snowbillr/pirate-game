'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
      vendor: ['phaser'],
      app: './src/index.ts',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },

    resolve: {
      extensions: ['.ts', '.js', '.d.ts'],
    },

    module: {
        rules: [
          {
            test: [/\.ts$/],
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname, 'node_modules/'),
            loader: 'ts-loader',
          },
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader',
          }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
        new HtmlWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.bundle.js'
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
          from: path.resolve(__dirname, 'assets', '**', '*'),
          to: path.resolve(__dirname, 'dist'),
        }]),
    ],

    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      open: true,
    }
};