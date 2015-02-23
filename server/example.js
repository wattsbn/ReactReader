var FS = require("q-io/fs");
var HTTP = require("q-io/http");
var util = require('util');
var parseString = require('xml2js').parseString;
var express = require('express');

var apiKey = '1679636f33c76a038a1bce8fad09a5babfad8f5f';

function print(something) {
	console.log(util.inspect(something, { showHidden: true, depth: null }));
}

var fullResponse = {};
function getComics(query) {
	var options = {
    	host: 'www.comicvine.com',
  		path: '/api/search/?api_key=' + apiKey + '&resources=volume&field_list=name,image,description,site_detail_url,start_year'
	};
	options.path += '&query=' + query;
	HTTP.request(options).done(function(response) {
		console.log(response.status);
		response.body.read().done(function(buffer) {
			parseString(buffer.toString(), function (err, result) {
			    fullResponse = result;
			});
	    });
	}, function() { console.log('error', arguments); });
}

function getFiles() {
	FS.list('/volume1/Comics').then(function() {
		console.log(arguments);
	}).done();
}

var app = express();
app.get('/', function (req, res) {
	res.append('Content-Type', 'application/json');
	res.send(JSON.stringify(fullResponse));
});

var server = app.listen(1337, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s\n', host, port)
});

getComics('flash');
