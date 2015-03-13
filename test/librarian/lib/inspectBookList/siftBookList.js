var fetchBookList   = require( 'librarian/lib/fetchParentASIN/fetchBookList' );
var siftBookList    = require( 'librarian/lib/inspectBookList/siftBookList' );

var Q = require('q');

var should = require('should');

module.exports = function(){
	describe( 'librarian/lib/inspectBookList/siftBookList.jsのテスト', function(){
		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		var bookList;
		this.timeout( 0 );

		before( function( done ){
            fetchBookList( [] )
            .then( siftBookList )
			.done( function( siftedBookList ){
                bookList = siftedBookList;
				done();
			});
		});

		it( '配列を返す', function(){
			bookList.should.be.instanceof( Array );
		});

		it( 'titleプロパティがある', function(){
			for (var i = 0; i < bookList.length; i++) {
				bookList[i].should.have.property( 'title' );
			}
		});

		it( 'ASINプロパティがある', function(){
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

		it( 'AuthorityASINプロパティがある', function(){
			for (var i = 0; i < bookList.length; i++) {
				bookList[i].should.have.property( 'AuthorityASIN' );
			}
		});

		it( 'AuthorityASINプロパティは空の文字列ではない', function(){
			for (var i = 0; i < bookList.length; i++) {
				var AuthorityASIN = bookList[i].AuthorityASIN;
				( AuthorityASIN.length ).should.be.above( 0 );
			}
		});
	});
}
