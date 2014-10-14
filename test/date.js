var dateUtils = require("../src/utils/date");
var should = require("should");

describe("Given the date utility", function() {
    it("should be defined", function() {
        dateUtils.should.be.defined;
    });
    it("should have toISO method", function() {
        dateUtils.toISO.should.be.defined;
    });
    it("should have isISO method", function() {
        dateUtils.isISO.should.be.defined;
    });
    it("should have parseISO method", function() {
        dateUtils.parseISO.should.be.defined;
    });
    it("should toStringWithFormat", function() {
        dateUtils.toStringWithFormat.should.be.defined;
    });
    describe("when I want to check if a date isISO", function() {
        it("should return empty string when not an empty string", function() {
            var result = dateUtils.isISO("");
            result.should.be.false;
        });
        it("should return empty string when not an empty string", function() {
            var result = dateUtils.isISO("oekfepofekfo");
            result.should.be.false;
        });
        it("should return empty string when not an empty string", function() {
            var result = dateUtils.isISO("20140101");
            result.should.be.true;
        });
        it("should return empty string when not an empty string", function() {
            var date = new Date();

            var result = dateUtils.isISO(date);
            result.should.be.false;
        });
    });
    describe("when I want to toISO a date", function() {
        it("should return a valid ISO date format", function() {
            var result = dateUtils.toISO("20140101");
            result.should.be.false;
        });
        it("should return a valid ISO date format", function() {
            var date = new Date();
            var result = dateUtils.toISO(date);
            result.should.not.be.false;
        });
    });
    describe("when I want to parseISO a date", function() {
        it("should return null when invalid data", function() {
            var result = dateUtils.parseISO();
            (result === null).should.be.true;
        });
        it("should return a Date when invalid data", function() {
            var year = 2014;
            var result = dateUtils.parseISO(year + "0101");
            (result === null).should.be.false;
            result.getFullYear().should.equal(year);
        });
    });
    describe("when a string formated based on some code", function() {
        it("should work for m", function() {
            var date = new Date();
            var result = dateUtils.toStringWithFormat("20140202", "m");
            result.should.equal("2");
            result.should.not.be.false;
        });
        it("should work for mmss", function() {
            var date = new Date();
            var result = dateUtils.toStringWithFormat("20140202", "dd");

            result.should.not.be.false;
            result.should.equal("02");
        });
    });
});