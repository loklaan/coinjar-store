
// Fetchs a JSON Object from valid url.
// Example:

// var fetch = require('fetch-json')
// fetch('http://time.jsontest.com', function(err, jsonObj) {
//     if (err)
//         throw err
//     else
//         console.log(jsonObj)
// })

var request = require('request')

function isJsonContent(contentType) {return contentType === 'application/json'}

module.exports = function (url, callback) {
    request(url, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            if (isJsonContent(res.headers['content-type'])) {
                return callback(null, JSON.parse(body))
            } else {
                return callback(new Error('not json'))
            }
        } else if (err) {
            return callback(new Error('unable to fetch'))
        } else {
            return callback(new Error('unknown error'))
        }
    })
}