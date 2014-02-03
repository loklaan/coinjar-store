
// Establishes a connection to a sqlite3 database
// to store JSON Objects with a table schema of
// [datetime, jsonstring]
// Example:

// var Storage = require('store-json')
// var store = new Storage('./database.sqlite', function(err) {
//     if (err)
//         throw err
// })
// store.insert( {"whut iz life?": 42}, function(err) {
//     if (err)
//         throw err
// })

var sqlite3 = require('sqlite3')
var util = require('util')
var EventEmitter = require('events').EventEmitter

function JsonStorage(dbPath, cb) {
    var self = this
    EventEmitter.call(this)
    if (!(cb instanceof Function))
        cb = function(){}

    var db = new sqlite3.Database(dbPath, function(err) {
        if (err)
            cb(err)
        this.emit('connect')
    })

    var createStatement = 'create table if not exists stored_json (datetime varchar, json varchar)'
    db.run(createStatement, function(err) {cb(err)})

    this.insert = function(date, json, callback) {
        var jsonString = (json instanceof String) ? json : JSON.stringify(json)
        var datetimeString = (new Date(date)).toISOString()
        var insertStatement = 'insert into stored_json values (?, ?)'

        db.run(insertStatement, [datetimeString, jsonString], function(err) {
            _emitError(err)
            if (!(callback instanceof Function))
                callback = function(){}
            callback(err)
        })
    }

    function _emitError(err) {
        if (err)
            this.emit('error', err)
    }
}

util.inherits(JsonStorage, EventEmitter)

module.exports = JsonStorage