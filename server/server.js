var q = require('q');
var http = require('http');
var fs = require('fs');
var FS = require("q-io/fs");
var HTTP = require("q-io/http");
var util = require('util');
var xml2js = require('xml2js');
var express = require('express');

var parser = new xml2js.Parser({explicitArray: false});
var apiKey = '1679636f33c76a038a1bce8fad09a5babfad8f5f';

function print(something) {
    console.log(util.inspect(something, { showHidden: true, depth: null }));
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

function makeRequest(options) {
    var callback = function(response) {
        console.log('STATUS: ' + response.statusCode);
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
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

var fullResponse = {};
function getComics(query) {
    var options = {
        host: 'www.comicvine.com',
        path: '/api/search/?api_key=' + apiKey + '&resources=volume&field_list=id,name,image,description,site_detail_url,start_year'
    };
    options.path += '&query=' + query;
    HTTP.request(options).done(function(response) {
        console.log(response.status);
        response.body.read().done(function(buffer) {
            parser.parseString(buffer.toString(), function (err, result) {
                fullResponse = result;
            });
        });
    }, function() { console.log('error', arguments); });
}

function searchComics(query) {
    var options = {
        host: 'www.comicvine.com',
        path: '/api/search/?api_key=' + apiKey + '&resources=volume&field_list=id,name,image,site_detail_url,start_year,description'
    };
    options.path += '&query=' + query;
    var defferred = q.defer();
    HTTP.request(options).then(function(response) {
        response.body.read().then(function(buffer) {
            parser.parseString(buffer.toString(), function (err, result) {
                defferred.resolve(result);
            });
        });
    });
    return defferred.promise;
}

function getFiles3() {
    FS.list('/volume1/Comics').then(function() {
        console.log(arguments);
    }).done();
}

var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.get('/', function (req, res) {
    res.append('Content-Type', 'application/json');
    res.send(JSON.stringify(fullResponse));
});

app.param('term', function (req, res, next, term) {
    req.term = term;
    next();
})

app.get('/search/:term', function (req, res) {
    searchComics(req.term).then(function(result) {
        res.send(result);
    });
    res.append('Content-Type', 'application/json');
});

var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s\n', host, port)
});

function testSQL() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'admin',
        password : 'secret',
        database : 'comics'
    });

    connection.connect();
    connection.query('SELECT * from series', function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });

    connection.end();
}
