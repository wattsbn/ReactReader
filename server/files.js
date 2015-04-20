'use strict';
var http = require('http');
var FS = require('q-io/fs');

function makeRequest(options) {
    var callback = function(response) {
        console.log('STATUS: ' + response.statusCode);
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });
    };

    var request = http.request(options, callback);
    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    request.end();
}

//http://68.39.81.154:5000/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=admin&passwd=Golden89&session=FileStation&format=cookie
//http://68.39.81.154:5000/webapi/FileStation/file_share.cgi?api=SYNO.FileStation.List&version=1&method=list_share
function getFiles() {
    var options = {
        host: '192.168.2.100',
        port: '5000',
        path: '/webapi/FileStation/file_share.cgi?_sid=KhzzeIOayjMzUD2KIN00078&api=SYNO.FileStation.List&version=1&method=list_share'
    };
    makeRequest(options);
}


function getLocalFiles() {
    FS.list('/volume1/Comics').then(function() {
        console.log(arguments);
    }).done();
}

module.exports = {
    getLocal: getLocalFiles,
    getFiles: getFiles
};