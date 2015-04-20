'use strict';
var path = require('path');
var webpack = require('webpack');
var uglify = require('./uglify');

var config = {
    devtool: 'source-map',
    entry: {
        'main': ['./scripts/routes']
    },
    recordsPath: path.resolve(__dirname, '..', '..', 'build', 'records.json'),
    output: {
        path: path.resolve(__dirname, '..', '..', 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        root: [
            path.resolve(__dirname, '..', 'node_modules'),
            path.resolve(__dirname, '..', 'scripts'),
            path.resolve(__dirname, '..', '..')
        ],
        alias: require('../alias'),
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/},
            {test: /\.(png|jpg|gif|woff|eot|ttf|otf|svg|cur)/, loader: 'file-loader?name=assets/[name].[ext]'},
            {test: /\.less$/, loaders: ['style', 'css?-minimize', 'less']}
        ]
    }
};

function getConfiguration(minify, hideSourceMaps) {
    if (hideSourceMaps) {
        config.devtool = 'hidden-source-map';
    }
    if (minify){
        uglify(config, true);
    }
    return config;
}

module.exports = {
    config: getConfiguration
};