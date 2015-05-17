"use strict";

var fetchBookList = require( 'shelf/lib/fetchAuthor' );

var Q 		= require('q');
var should 	= require('should');

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
		console.log( firstAuthor, lastAuthor );
	});

});
