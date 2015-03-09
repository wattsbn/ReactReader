var sqlite = require('sql.js');
var fs = require('fs');

function disconnect() {
    var data = this.export();
    this.close();
    var buffer = new Buffer(data);
    fs.writeFileSync('./comics.db', buffer);
}

function connect() {
    var filebuffer = fs.readFileSync('./comics.db');
    var db = new sqlite.Database(filebuffer);
    db.disconnect = disconnect;
    return db;
}

module.exports = {
    connect: connect
};