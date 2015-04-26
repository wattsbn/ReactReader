'use strict';
var express = require('express');
var comicVine = require('./comicVine');
var matches = require('./matches');

var app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.param('term', function (req, res, next, term) {
    req.term = term;
    next();
});

app.get('/search/:term', function (req, res) {
    res.append('Content-Type', 'application/json');
    comicVine.search(req.term).then(function(result) {
        res.send(result);
    });
});

matches.initialize(app);

function startServer() {
    var server = app.listen(1337, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('ReactReader API listening at http://%s:%s\n', host, port);
    });
}

if (require.main === module) {
    startServer();
}

module.exports = {
    start: startServer
};

