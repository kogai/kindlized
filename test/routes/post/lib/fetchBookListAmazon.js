var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var Q = require('q');
require('should');

module.exports = function(){
	describe('routes/post/fetchBookListAmazonのテスト', function () {
		this.timeout( 0 );
		var bookList;
		var data = {
			req: {
				body:{
					newBook: 'ワンピース'
				}
			}
		};

		before( function( done ){
			Q.when( data )
			.then( fetchBookListAmazon )
			.done( function( resultData ){
				bookList = resultData.bookListInAmazon;
				done();
			});
		});

		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		it( 'fetchBookListはbookList配列を返す', function(){
			bookList.should.be.instanceof( Array );
		});

		it( 'bookList配列にはTitleプロパティがある', function(){
			for (var i = 0; i < bookList.length; i++) {
				bookList[i].ItemAttributes[0].should.have.property( 'Title' );
			}
		});

		it( 'bookList配列にはASINプロパティがある', function(){
			for (var i = 0; i < bookList.length; i++) {
				bookList[i].should.have.property( 'ASIN' );
			}
		});

		it( 'ASINプロパティは空の文字列ではない', function(){
			for (var i = 0; i < bookList.length; i++) {
				var ASIN = bookList[i].ASIN;
				( ASIN.length ).should.be.above( 0 );
			}
		});

	});
}
