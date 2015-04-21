'use strict';
var FS = require('q-io/fs');
var config = require('./config');

function getFiles() {
    FS.list(config.comicsPath).then(function() {
        console.log(arguments);
    }).done();
}

module.exports = {
    getFiles: getFiles
};