var fetchBookList = require( 'shelf/lib/fetchAuthor' );

var Q 		= require('q');
var should 	= require('should');

// module.exports = function(){
	describe( 'shelf/lib/sortAuthorByModified.jsのテスト', function(){
		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
		});

		var authorList;
		this.timeout( 0 );

		before( function( done ){
			fetchBookList( [] )
			.done( function( data ){
				authorList = data;
				done();
			});
		});

		it( '最初と最後の最終編集日がソートされている', function(){
			var firstAuthor 	= authorList[ 0 ];
			var lastAuthor 	= authorList[ authorList.length - 1 ];
			console.log( firstAuthor );
		});

		// it( 'bookList配列にはASINプロパティがある', function(){
		// 	for (var i = 0; i < bookList.length; i++) {
		// 		bookList[i].should.have.property( 'ASIN' );
		// 	}
		// });
      //
		// it( 'ASINプロパティは空の文字列ではない', function(){
		// 	for (var i = 0; i < bookList.length; i++) {
		// 		var ASIN = bookList[i].ASIN;
		// 		( ASIN.length ).should.be.above( 0 );
		// 	}
		// });
      //
		// it( 'bookList配列にはAuthorityASINプロパティがある', function(){
		// 	for (var i = 0; i < bookList.length; i++) {
		// 		bookList[i].should.have.property( 'AuthorityASIN' );
		// 	}
		// });
      //
		// it( 'AuthorityASINプロパティは配列である', function(){
		// 	for (var i = 0; i < bookList.length; i++) {
		// 		var AuthorityASIN = bookList[i].AuthorityASIN;
		// 		AuthorityASIN.should.be.instanceof( Array );
		// 	}
		// });
	});
// }
