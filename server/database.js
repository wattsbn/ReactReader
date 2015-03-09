var sqlite = require('sql.js');
var volumes = require('./volumes');
var fs = require('fs');
var filebuffer = fs.readFileSync('./comics.db');
var db = new sqlite.Database(filebuffer);


    volumes.ensureExist(db);

    var test = {
        name: 'grifter',
        description: 'the best at grifting',
        comicVine: 123123123
    };

    volumes.addRow(db, test);
    volumes.printAll(db);


var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync("./comics.db", buffer);

db.close();