
// Establishes a connection to a sqlite3 database
// to store JSON Objects with a table schema of
// [datetime, jsonstring]
// Example:

// var Storage = require('store-json')
// var newDate = new Date
// var store = new Storage('./database.sqlite', function(err) {
//     if (err)
//         throw err
// })
// store.insert(newDate, {"whut iz life?": 42}, function(err) {
//     if (err)
//         throw err
// })

var sqlite3 = require('sqlite3');
var util = require('util');

function JsonStorage(dbPath, cb) {

    var db = new sqlite3.Database(dbPath, function(err) {
        if (err) {
            cb(err);
        }
    });

    var createStatement = 'create table if not exists stored_json (datetime varchar, json varchar)';
    db.run(createStatement, function(err) {
        cb(err);
    });

    /**
     * Inserts a parsed date and stringified json into the database instance
     * @param  {String}   date     Date string in ISO-8601 format
     * @param  {String}   json     JSON stringified
     * @param  {Function} callback callback(err)
     */
    this.insert = function(date, json, callback) {
        if (isNaN(Date.parse(date))) {
            callback(new Error('must use valid date format ie. ISO-8601'));
            return;
        }
        var jsonString = (json instanceof String) ? json : JSON.stringify(json);
        var datetimeString = new Date(Date.parse(date)).toISOString();
        var insertStatement = 'insert into stored_json values (?, ?)';

        db.run(insertStatement, [datetimeString, jsonString], function(err) {
            if (!(callback instanceof Function)) {
                callback = function(){};
            }
            callback(err);
            return;
        });
    };
}


module.exports = JsonStorage;