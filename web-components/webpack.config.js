'use strict';

const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: SRC_PATH,
    entry: {
        index: './index.js',
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                    },
                ],
            },
            {
                test: /shadow\.css$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'css-loader'
                    },
                ],
            },
            {
                test: /index\.css$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'style.css',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new CopyWebpackPlugin([{ from: 'static/', to: 'static/' }]),
    ]
};
