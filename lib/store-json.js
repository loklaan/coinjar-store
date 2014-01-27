
// Establishes a connection to a sqlite3 database
// to store JSON Objects with a table schema of
// [datetime, jsonstring]
// Example:

// var Storage = require('store-json')
// var store = new Storage('./database.sqlite', function(err) {
//     if (err)
//         throw err
// })
// store.insert( {"whut iz life?": 42} )

var sqlite3 = require('sqlite3')
var util = require('util')
var events = require('events')

function JsonStorage(dbPath, cb) {
    var self = this
    events.EventEmitter.call(self)
    if (!(cb instanceof Function))
        cb = function(){}

    var db = new sqlite3.Database(dbPath, function(err) {
        if (err)
            cb(err)
    })

    var createStatement = 'create table if not exists stored_json (datetime varchar, json varchar)'
    db.run(createStatement, function(err) {cb(err)})

    self.insert = function(json) { // optional callback to allow user controlled chaining ?
        var jsonString = (json instanceof String) ? json : JSON.stringify(json)
        var datetimeString = new Date.now().toISOString()
        var insertStatement = 'insert into stored-json values (?, ?)'
        db.run(insertStatement, [datetimeString, jsonString], function(err) {_emitError(err)})
    }

    function _emitError(emitter, err) {
        if (err)
            throw err
            self.emit('error', err)
    }
}

JsonStorage.prototype = Object.create(events.EventEmitter.prototype)

module.exports = JsonStorage