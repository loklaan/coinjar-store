#!/usr/bin/env node

// Make this seperate from the "coinjar-store" module (that doesn't yet exist)

var config = require('./config.json')
var fetch = require('./lib/fetch-json')
var Storage = require('./lib/store-json')
var timer = require('./lib/timer')
var program = require('commander')
var fs = require('fs')
var path = require('path')

// cli setup
program
    .version(require('./package.json').version)
    .usage('[options]')
    .option('-d, --database <file>', 'path to database file')
    .option('-u, --url <url>', 'url to valid JSON')
    .option('-i, --interval <time>', 'minutes between updates')
program.on('--help', function() {
    console.log('  Example:')
    console.log('')
    console.log('    $ coinjar.js -d \'./db/rates.sqlite\'')
    console.log('    $ coinjar.js -u \'http://www.example.com/file.json\'')
    console.log('    $ coinjar.js -i \'2\'')
})
program.parse(process.argv)
var dbPath = program.database ? program.database : config.dbPath,
    url = program.url ? program.url : config.url,
    interval = Number(program.interval ? program.interval : config.interval)

console.log('')
console.log('  CoinJar Store')
console.log('  Fetching rates every ' + interval + ' minute' + (interval > 1 ? 's' : ''))
console.log('')

// check for and make database dir
if (!(fs.existsSync(path.dirname(dbPath)))) {
    fs.mkdirSync(path.dirname(dbPath))
}
var store
var store = new Storage(dbPath, function(err) {
    if (err)
        throw err
})
store.on('error', console.error)

timer(interval, repeatFetch)
function repeatFetch() { // recursive tom foolery
    fetch(url, function(err, fetchTime, jsonObj) {
        if (err)
            console.error(err)
        var print = '    '
        if (jsonObj.spot.USD)
            print += '$' + Number(jsonObj.spot.USD).toFixed(2) + ' @ '
        print += (new Date(fetchTime)).toTimeString()
        console.log(print)
        store.insert(fetchTime, jsonObj)
    })
    timer(interval, repeatFetch)
}