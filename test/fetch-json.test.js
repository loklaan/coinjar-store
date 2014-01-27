var expect = require('chai').expect
var fetch = require('../lib/fetch-json.js')
var http = require('http')
var url = require('url')

describe('FETCH-JSON', function() {
    before(function(done) {
        var server = http.createServer(function(req, res) {
            var parsedUrl = url.parse(req.url, true)
            var query = parsedUrl.query.type

            if (query === 'json') {
                var jsonString = JSON.stringify({"Some Property": "Some Value..."})
                var headers = {
                    "Content-Type": "application/json",
                    "Content-Length": jsonString.length,
                }

                res.writeHeader(200, headers)
                res.end(jsonString)
            } else {
                res.end('unsupported query')
            }
        }).listen(8000, function() {
            done()
        })
    })

    it('should respond well to valid json', function(done) {
        fetch('http://localhost:8000/?type=json', function(err, obj) {
            expect(err).to.not.exist
            expect(obj).is.a('object')
            done()
        })
    })
    it('should respond with error on invalid json url', function(done) {
        fetch('http://localhost:8000/?type=notjson', function(err, obj) {
            expect(err).to.exist
            expect(obj).to.not.exist
            done()
        })
    })
})