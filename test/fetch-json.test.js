var expect = require('chai').expect
var fetch = require('../lib/fetch-json.js')
var http = require('http')
var url = require('url')

describe('Fetch-json', function() {
    var port = 8083
    var address = 'http://localhost:' + port + '/?type='

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
            } else if (query === 'timeout') {
                res.writeHeader(408)
                res.end()
            } else {
                res.end('unsupported query')
            }
        }).listen(port, function() {
            done()
        })
    })

    it('should respond well to valid json', function(done) {
        fetch(address + 'json', function(err, date, obj) {
            expect(err).to.not.exist
            expect(obj).is.a('object')
            expect(date).is.a('string')
            done()
        })
    })
    it('should respond with error on invalid json url', function(done) {
        fetch(address + 'notjson', function(err, date, obj) {
            expect(err).to.exist
            expect(obj).to.not.exist
            expect(date).to.not.exist
            done()
        })
    })
    it('should respond with special error on request timeout', function(done) {
        fetch(address + 'timeout', function(err, date, obj) {
            expect(err).to.exist
            expect(err.message).to.eql('request timeout')
            done()
        })
    })
})