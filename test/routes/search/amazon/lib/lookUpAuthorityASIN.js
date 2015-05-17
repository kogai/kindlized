"use strict";

var Q = require('q');
var should = require('should');
var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('routes/search/lib/handleBookListFromAmazon');
var searchAuthorityASIN = require('routes/search/lib/searchAuthorityASIN');
var lookUpAuthorityASIN = require('routes/search/lib/lookUpAuthorityASIN');
var testArray = require('test/routes/search/amazon/lib/testArray');

describe('routes/search/lib/handleBookListFromAmazonのテスト', function() {
	it('テストが動作している', function(done) {
		(5).should.be.exactly(5);
		done();
	});

	this.timeout(0);
	var testFunc = function( bookName ){
		var bookList;
	  var data = {
			req: {
				body: {
					newBook: bookName
				}
			}
		};

		before(function(done) {
			fetchBookListAmazon(data)
				.then(handleBookListFromAmazon)
				.then(searchAuthorityASIN)
				.then(lookUpAuthorityASIN)
				.done(function(data) {
					bookList = data.bookListInAmazon;
					done();
				});
		});

		it('isKindlizedプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.should.have.property('isKindlized');
			});
		});

		it('isKindlizedプロパティはBoolean型である', function() {
			bookList.forEach(function( book, index ){
				book.isKindlized.should.be.instanceof(Boolean);
			});
		});

	};
	testArray.forEach(testFunc);
});
