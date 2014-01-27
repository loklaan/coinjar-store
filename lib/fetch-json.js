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