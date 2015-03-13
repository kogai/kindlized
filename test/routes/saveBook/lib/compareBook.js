var compareBook   = require( 'routes/saveBook/lib/compareBook' );
var testdata      = require( 'test/routes/saveBook/lib/testdata' );
var testdataTrue 	= testdata[0];
var testdataFalse = testdata[1];

var Q             = require('q');
var should        = require('should');

module.exports = function(){
	describe( 'librarian/lib/inspectBookList/inspectBook.jsのテスト', function(){
		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		this.timeout( 0 );

		it( 'DBに存在するならtrueを返す', function(){
			compareBook( testdataTrue )
			.done( function( expectTrue ){
				should( expectTrue ).be.exactly( true );
			});
		});

		it( 'DBに存在しないならfalseを返す', function(){
			compareBook( testdataFalse )
			.done( function( expectFalse ){
				should( expectFalse ).be.exactly( false );
			});
		});

	});
}
