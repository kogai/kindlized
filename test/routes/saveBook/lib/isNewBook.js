var isNewBook   	= require( 'routes/saveBook/lib/isNewBook' );
var testdata      = require( 'test/routes/saveBook/lib/testdata' );

var dataExist 		= testdata[0];
var dataNotExist 	= testdata[1];

var Q             = require('q');
var should        = require('should');

module.exports = function(){
	describe( 'routes/saveBook/lib/isNewBookのテスト', function(){
		this.timeout( 0 );

		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		it( 'DBに存在するならfalseを返す', function( done ){
			isNewBook( dataExist )
			.done( function( data ){
				should( data.isNewBook ).be.exactly( false );
				done();
			});
		});

		it( 'DBに存在しないならtrueを返す', function( done ){
			isNewBook( dataNotExist )
			.done( function( data ){
				should(data.isNewBook ).be.exactly( true );
				done();
			});
		});

	});
}
