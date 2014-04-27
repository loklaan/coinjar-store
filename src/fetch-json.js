
// Fetches a JSON Object from valid url.
// Example:

// var fetch = require('fetch-json')
// fetch('http://time.jsontest.com', function(err, date, jsonObj) {
//     if (err)
//         throw err
//     else
//         console.log(jsonObj + ' @ ' + date)
// })

var request = require('request')

function isJsonContent(contentType) {
    return typeof contentType === 'string' && contentType.toString().indexOf('application/json') != -1
}

module.exports = function (url, callback) {
    var fetchTime = (new Date).toISOString()

    request(url, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            if (isJsonContent(res.headers['content-type'])) {
                return callback(null, fetchTime, JSON.parse(body))
            } else {
                return callback(new Error('not json'))
            }
        } else if (!err && res.statusCode === 408) {
            return callback(new Error('request timeout'))
        } else if (err) {
            return callback(new Error('unable to fetch'))
        } else {
            return callback(new Error('unknown error'))
        }
    })
}