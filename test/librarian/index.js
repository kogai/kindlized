var fetchBookList = require( '../../librarian/lib/fetchBookList' );
var Q =	require('q');

var should = require('should');

module.exports = function(){
	describe( 'librarian/fetchBookListのテスト', function(){
    var bookList;
    this.timeout( 0 );

    before( function( done ){
			Q.when( [] )
			.then( fetchBookList )
			.done( function( fetchedBookList ){
        bookList = fetchedBookList;
        done();
			});
    });

		it( 'fetchBookListはbookList配列を返す', function(){
			bookList.should.be.instanceof( Array );
		});

    it( 'bookList配列にはtitleプロパティがある', function(){
      for (var i = 0; i < bookList.length; i++) {
        bookList[i].should.have.property( 'title' );
      }
    });
	});
}
