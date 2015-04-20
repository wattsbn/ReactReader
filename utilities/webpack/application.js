'use strict';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

function build(config, callback) {
    webpack(config, function(error, stats) {
        if (error) {
            console.log(error);
            return callback(false);
        }
        var jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
            console.log(jsonStats.errors);
            return callback(false);
        }
        if (jsonStats.warnings.length > 0) {
            console.log('There were',jsonStats.warnings.length, 'warning(s)...');
        }
        console.log('Successfully built project');
        callback(true);
    });
}

function serve(config, callback) {
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.path,
        hot: true,
        historyApiFallback: true
    }).listen(7000, 'localhost', function (err, result) {
            if (err) {
                console.log(err);
                callback(false);
            }
            console.log('Listening at localhost:7000');
        });
}

function startServer(fast, minify, manual, callback) {
    var result = require('./development').config(fast, minify, manual);
    serve(result, callback);
}

function buildApp(minify, hideSourceMaps, callback) {
    build(require('./production').config(minify, hideSourceMaps), callback);
}

function test(server, callback) {
    var config = require('./testing').config(server);
    if (server) {
        serve(config, callback);
    } else {
        build(config, callback);
    }
}

module.exports = {
    build: buildApp,
    connect: startServer,
    test: test
};