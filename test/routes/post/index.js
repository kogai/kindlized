var fetchBookListAmazon = require('../../../routes/post/lib/queryBookList/fetchBookListAmazon');
var Q = require('q');
require('should');

describe('routes/post/fetchBookListAmazonのテスト', function () {
	this.timeout( 0 );
    var data = {
        newBook: 'ヒストリエ'
    };

	before( function( done ){
		Q.when( data )
		.then( fetchBookListAmazon )
		.done( function( resultData ){
            console.log( 'resultData', resultData );
            data.bookListInAmazon = resultData.bookListInAmazon;
			done();
		});
	});

    it( 'テストが動作している', function( done ){
        (5).should.be.exactly(5);
        done();
    });

	it( 'fetchBookListはbookList配列を返す', function(){
		data.bookListInAmazon.should.be.instanceof( Array );
	});

	// it( 'bookList配列にはtitleプロパティがある', function(){
	// 	for (var i = 0; i < bookList.length; i++) {
	// 		bookList[i].should.have.property( 'title' );
	// 	}
	// });
    //
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

  // it( 'routes/post/fetchBookListAmazonのテスト', function( done ){
  //
  //   fetchBookListAmazon( data )
  //   .then( function( data ){
  //       var bookListInAmazon = data.bookListInAmazon;
  // 	bookListInAmazon.should.be.instanceof( Array );
  //       done();
  //   });
  //
  // });

});

// module.exports = function(){
// }
