var Q = require('q');
var should = require('should');
var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('routes/search/lib/handleBookListFromAmazon');
var searchAuthorityASIN = require('routes/search/lib/searchAuthorityASIN');
var saveBookListToDB = require('routes/search/lib/saveBookListToDB');

module.exports = function() {
	describe('routes/search/lib/handleBookListFromAmazonのテスト', function() {
		it('テストが動作している', function(done) {
			(5).should.be.exactly(5);
			done();
		});

		this.timeout(0);
		var testArray = [
			'海街diary',
			'逃げるは恥だが役に立つ',
			'刃牙',
			'インタラクティブ・データビジュアライゼーション ―D3.js',
			'アイスクリン強し (講談社文庫)',
			'W>Gーtaste 3 (<CDーROM>(Win版))',
			'地球の長い午後',
			'-',
			' '
		];
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
					.then(saveBookListToDB)
					.done(function(data) {
						bookList = data.savedBooks;
						done();
					});
			});

			it('_idプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('_id');
					( book._id.length ).should.be.above( 0 );
					console.log( book );
				});
			});

			it('urlプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('url');
					( book.url[0].length ).should.be.above( 0 );
				});
			});

			it('titleプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('title');
					( book.title[0].length ).should.be.above( 0 );
				});
			});

			it('authorプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('author');
					( book.author[0].length ).should.be.above( 0 );
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
};
