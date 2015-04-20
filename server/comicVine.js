'use strict';
var q = require('q');
var xml2js = require('xml2js');
var HTTP = require('q-io/http');

var apiKey = '1679636f33c76a038a1bce8fad09a5babfad8f5f';
var parser = new xml2js.Parser({explicitArray: false});

function searchVolumes(query) {
    var options = {
        host: 'www.comicvine.com',
        path: '/api/search/?api_key=' + apiKey + '&limit=25&resources=volume&field_list=id,name,image,site_detail_url,start_year,description'
    };
    options.path += '&query=' + encodeURIComponent(query);
    var deferred = q.defer();
    console.log(options.host+options.path);
    HTTP.request(options).then(function(response) {
        console.log(response.status);
        response.body.read().then(function(buffer) {
            parser.parseString(buffer.toString(), function (err, result) {
                console.log('result count', result.response.results.volume.length);
                deferred.resolve(result);
            });
        });
    });
    return deferred.promise;
}

module.exports = {
    search: searchVolumes
};