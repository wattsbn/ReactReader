'use strict';
var database = require('./database');
var volumes = require('./volumes');

var db = database.connect();
volumes.ensureExist(db);

var test = {
    name: 'grifter',
    description: 'the best at grifting',
    comicVine: 123123123
};

volumes.addRow(db, test);
volumes.printAll(db);

db.disconnect();