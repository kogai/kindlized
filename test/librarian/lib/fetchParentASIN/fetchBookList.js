var fetchBookList       = require( 'librarian/lib/fetchParentASIN/fetchBookList' );
var siftBookList        = require( 'librarian/lib/inspectBookList/siftBookList' );
var inspectBook         = require( 'librarian/lib/inspectBookList/inspectBook' );
var testdata         	= require( 'test/librarian/lib/inspectBookList/testdata' );

var Q = require('q');

var should = require('should');

// module.exports = function(){
	describe( 'librarian/lib/inspectBookList/inspectBook.jsのテスト', function(){
		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		var bookList;
		this.timeout( 0 );

		before( function( done ){
            fetchBookList( testdata )
			.done( function( data ){
				bookList = data;
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

		it( 'bookList配列にはAuthorityASINプロパティがある', function(){
			for (var i = 0; i < bookList.length; i++) {
				bookList[i].should.have.property( 'AuthorityASIN' );
			}
		});

		it( 'AuthorityASINプロパティは配列である', function(){
			for (var i = 0; i < bookList.length; i++) {
				var AuthorityASIN = bookList[i].AuthorityASIN;
				AuthorityASIN.should.be.instanceof( Array );
			}
		});
	});
// }
