var expect = require('chai').expect
var Store = require('../src/store-json.js')
var fs = require('fs')
var db = "test.sqlite"

function clean() {
    if (fs.existsSync(db)) {
        fs.unlinkSync(db)
        expect(fs.existsSync(db)).to.be.false
    }
}

describe('Store-json', function() {
    beforeEach(clean)
    afterEach(clean)

    describe('#constructor()', function() {

        it('should create non-existent database', function(done) {
            var store = new Store(db, function(err) {
                expect(err).to.not.exist
                fs.exists(db, function(exists2) {
                    expect(exists2).to.be.true
                })
                done()
            })
        })
        it('should open accessible database', function(done) {
            fs.openSync(db, 'w')
            expect(fs.existsSync(db)).to.be.true
            var store = new Store(db, function(err) {
                expect(err).to.not.exist
                done()
            })
        })
    })

    describe('#insert()', function() {
        var store
        beforeEach(function(done) {
            store = new Store(db, function(err) {
                done()
            })
        })
        // afterEach(clean)

        it('should insert ISO date string', function(done) {
            var dateISO =new Date().toISOString()
            var jsonString = JSON.stringify({"property": "value"})
            store.insert(dateISO, jsonString, function(err) {
                expect(err).to.not.exist
                done()
            })
        })
        it('should insert date object string', function(done) {
            var dateObj = new Date()
            var jsonString = JSON.stringify({"property": "value"})
            store.insert(dateObj, jsonString, function(err) {
                expect(err).to.not.exist
                done()
            })
        })
        it('should return error on invalid insert params', function(done) {
            var dateWrong = 'caturday dah third', //lolwut
                dateRight = new Date
            var jsonString = JSON.stringify({this:2})
            store.insert(dateWrong, jsonString, function(err) {
                expect(err).to.exist
                done()
            })
        })
    })
})