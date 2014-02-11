var expect = require('chai').expect
var Store = require('../lib/store-json.js')
var fs = require('fs')
var config = require('../config.json')
var db = config.dbPathDev

describe('STORE-JSON', function() {
    describe('open/create database', function() {
        after(function() {
            fs.exists(db, function(exists) {
                if (exists)
                    fs.unlink(db, function(err) {
                        if (err)
                            throw err
                        fs.exists(db, function(exists2) {
                            expect(exists2).to.be.false
                        })
                    })
            })
        })

        it('should create non-existent database', function(done) {
            fs.exists(db, function(exists) {
                expect(exists).to.be.false
                if (!exists)
                    var store = new Store(db, function(err) {
                        expect(err).to.not.exist
                        fs.exists(db, function(exists2) {
                            expect(exists2).to.be.true
                        })
                        done()
                    })
                else
                    done()
            })
        })
        it('should open accessible database', function(done) {
            fs.exists(db, function(exists) {
                expect(exists).to.be.true
                if (exists)
                    var store = new Store(db, function(err) {
                        expect(err).to.not.exist
                        done()
                    })
                else
                    done()
            })
        })

    })
})