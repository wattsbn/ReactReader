'use strict';
var _  = require('underscore');
var find = require('walkdir');
var path = require('path');
var fs = require('fs');

var basePath = path.resolve(__dirname, '..', 'data');
var relativePath = path.resolve(basePath, '..');

function getData(callback) {
    var data = [];
    var finder = find(basePath);
    finder.on('directory', function(dir, stat, stop) {
        var hasDirectory  = _.find(fs.readdirSync(dir), function(name) {
            var filePath = path.resolve(dir, name);
            return fs.lstatSync(filePath).isDirectory();
        });
        if (hasDirectory) { return; }
        data.push({
            name: path.basename(dir),
            location: path.relative(relativePath, dir)
        });
        //stop();
    });
    finder.on('end', function() {
        callback(data);
    });
}

function initialize(app) {
    app.get('/files/unmatched', function(req, res) {
        res.append('Content-Type', 'application/json');
        getData(res.send.bind(res));
    });
}

module.exports = {
    initialize: initialize
};