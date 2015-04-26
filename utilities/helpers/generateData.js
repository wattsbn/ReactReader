'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('underscore');

var comicData = {
    'iron man': null,
    'new 52': {
        'batman': null,
        'the flash': null
    }
};

function createVolume(basePath, name) {
    _.each(_.range(1, _.random(5, 10)), function(index) {
        fs.closeSync(fs.openSync(path.resolve(basePath, name + ' ' + index + '.cbr'), 'w'));
    });
}

function createData(data, basePath, createFn) {
    mkdirp.sync(basePath);
    _.each(data, function(value, key) {
        if (value) {
            createData(value, path.resolve(basePath, key), createFn);
        } else {
            var directory = path.resolve(basePath, key);
            mkdirp.sync(directory);
            createFn(directory, key);
        }
    });
}

function createComics() {
    var basePath = path.resolve(__dirname, '..', '..', 'data');
    createData(comicData, basePath, createVolume);
}

module.exports = {
    createComics: createComics
};