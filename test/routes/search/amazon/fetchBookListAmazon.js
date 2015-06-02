"use strict";

var Q = require('q');
var should = require('should');
var testArray = require('test/routes/search/amazon/testArray');
var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');

describe('routes/search/lib/fetchBookListAmazonのテスト', function() {
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
				.done(function(data) {
					bookList = data.bookListInAmazon;
					done();
				});
		});

		it('配列を返す', function() {
			bookList.should.be.instanceof(Array);
		});

		it('ASINプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.should.have.property('ASIN');
			});
		});

		it('ASINプロパティは空の文字列ではない', function() {
			bookList.forEach(function( book, index ){
				( book.ASIN.length ).should.be.above( 0 );
			});
		});

		it('DetailPageURLプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.should.have.property('DetailPageURL');
			});
		});

		it('DetailPageURLプロパティは空の文字列ではない', function() {
			bookList.forEach(function( book, index ){
				( book.DetailPageURL.length ).should.be.above( 0 );
			});
		});

		it('ItemAttributesプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.should.have.property('ItemAttributes');
			});
		});

		it('ItemAttributes/Authorプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.ItemAttributes[0].should.have.property('Author');
			});
		});

		it('ItemAttributes/Authorプロパティは空の文字列ではない', function() {
			bookList.forEach(function( book, index ){
				( book.ItemAttributes[0].Author.length ).should.be.above( 0 );
			});
		});

		it('ItemAttributes/Titleプロパティがある', function() {
			bookList.forEach(function( book, index ){
				book.ItemAttributes[0].should.have.property('Title');
			});
		});

		it('ItemAttributes/Titleプロパティは空の文字列ではない', function() {
			bookList.forEach(function( book, index ){
				( book.ItemAttributes[0].Title.length ).should.be.above( 0 );
			});
		});
	};
	testArray.forEach(testFunc);
});
