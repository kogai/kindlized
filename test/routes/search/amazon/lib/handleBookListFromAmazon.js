var Q = require('q');
var should = require('should');
var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('routes/search/lib/handleBookListFromAmazon');
var testArray = require('test/routes/search/amazon/lib/testArray');

module.exports = function() {
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
					.done(function(data) {
						bookList = data.bookListInAmazon;
						done();
					});
			});

			it('配列を返す', function() {
				bookList.should.be.instanceof(Array);
			});

			it('AuthorityASINプロパティをもっていない', function() {
				bookList.forEach(function( book, index ){
					book.should.not.have.property('AuthorityASIN');
				});
			});

			it('ASINプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('ASIN');
					( book.ASIN[0].length ).should.be.above( 0 );
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

		};
		testArray.forEach(testFunc);
	});
};
