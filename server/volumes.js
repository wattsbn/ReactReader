
function Volume(name, description, comicVine) {
    Object.defineProperties(this, {
        description: {value: description, enumerable: true},
        name: {value: name, enumerable: true},
        comicVine: {Value: comicVine, enumerable: true}
    });
}

Object.defineProperties(Volume.prototype, {

});

function wrapData(data) {
    return new Volume(data.name, data.description, data.comicVine);
}

function addRow(db, volume) {
    var sql = 'INSERT INTO volumes (name, description, comicVine)';
    sql += ' VALUES (?, ?, ?)';
    //console.log(volume instanceof Volume);
    //volume = wrapData(volume);
    //console.log(volume instanceof Volume);
    db.run(sql, [volume.name, volume.description, volume.comicVine]);
}

function createTable(db) {
    var sql = 'CREATE TABLE IF NOT EXISTS volumes (';
    sql += 'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,';
    sql += 'name TEXT NOT NULL,';
    sql += 'description TEXT,';
    sql += 'comicVine INTEGER)';
    db.run(sql);
}

function printAll(db) {
    db.each("SELECT * FROM volumes", function(err, row) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(row);
        }
    });
}

module.exports = {
    ensureExist: createTable,
    addRow: addRow,
    printAll: printAll
};