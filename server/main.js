'use strict';
//var util = require('util');
var api = require('./api');

//function print(something) {
//    console.log(util.inspect(something, { showHidden: true, depth: null }));
//}
function start(callback) {
    api.start();
}

module.exports = {
    start: start
};