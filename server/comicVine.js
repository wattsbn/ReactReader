var HTTP = require("q-io/http");
var xml2js = require('xml2js');

var apiKey = '1679636f33c76a038a1bce8fad09a5babfad8f5f';
var parser = new xml2js.Parser({explicitArray: false});

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