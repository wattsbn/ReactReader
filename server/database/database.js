'use strict';
var sqlite = require('sql.js');
var fs = require('fs');

function extendInstance(db) {
    db.disconnect = function() {
        var data = db.export();
        db.close();
        var buffer = new Buffer(data);
        fs.writeFileSync('./comics.db', buffer);
    };
}

function connect() {
    var filebuffer = fs.readFileSync('./comics.db');
    var db = new sqlite.Database(filebuffer);
    extendInstance(db);
    return db;
}

module.exports = {
    connect: connect
};