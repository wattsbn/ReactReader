var util = require('util');
var express = require('express');

function print(something) {
    console.log(util.inspect(something, { showHidden: true, depth: null }));
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
});

app.get('/search/:term', function (req, res) {
    searchComics(req.term).then(function(result) {
        res.send(result);
    });
    res.append('Content-Type', 'application/json');
});

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

module.export = {
    start: startServer
};

