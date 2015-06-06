"use strict";

var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var Q = require('q');
require('should');

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


	it( 'fetchBookListはbookList配列を返す', function(){
		bookList.should.be.instanceof( Array );
	});

	it( 'bookList配列にはTitleプロパティがある', function(){
		var i;
		for (i = 0; i < bookList.length; i++) {
			bookList[i].ItemAttributes[0].should.have.property( 'Title' );
		}
	});

	it( 'bookList配列にはASINプロパティがある', function(){
		var i;
		for (i = 0; i < bookList.length; i++) {
			bookList[i].should.have.property( 'ASIN' );
		}
	});

	it( 'ASINプロパティは空の文字列ではない', function(){
		var i, ASIN;
		for (i = 0; i < bookList.length; i++) {
			ASIN = bookList[i].ASIN;
			( ASIN.length ).should.be.above( 0 );
		}
	});

});
