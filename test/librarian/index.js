var fetchBookList = require( '../../librarian/lib/fetchParentASIN/fetchBookList' );
var siftBookList 	= require( '../../librarian/lib/inspectBookList/siftBookList' );
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

	// describe( 'librarian/inspectBookListのテスト', function(){
	// 	var temp_bookList = [
	// 		{
	// 			"_id": {
	// 				"getTimestamp": function(){
	// 					return ;
	// 				}
	// 			}
	// 		}
	// 	]
	// 	bookList[i]._id.getTimestamp
	// 	it( 'siftBookListは定数')
	// });
}
