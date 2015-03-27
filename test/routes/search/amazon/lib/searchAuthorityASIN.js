var Q = require('q');
var should = require('should');
var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('routes/search/lib/handleBookListFromAmazon');
var searchAuthorityASIN = require('routes/search/lib/searchAuthorityASIN');
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
					.then(searchAuthorityASIN)
					.done(function(data) {
						bookList = data.bookListInAmazon;
						done();
					});
			});

			it('AuthorityASINプロパティがあり、空の文字列ではない', function() {
				bookList.forEach(function( book, index ){
					book.should.have.property('AuthorityASIN');
					( book.AuthorityASIN[0].length ).should.be.above( 0 );
				});
			});

		};
		testArray.forEach(testFunc);
	});
};
