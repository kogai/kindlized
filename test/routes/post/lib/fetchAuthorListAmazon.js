"use strict";

var fetchAuthorListAmazon = require('routes/search/lib/fetchAuthorListAmazon');
var Q = require('q');
require('should');

describe('routes/post/fetchAuthorListAmazonのテスト', function () {
	this.timeout( 0 );
	var authorList;
	var data = {
		bookListInAmazon: [
			{ "author": "染谷将太" },
			{ "author": "恩田" },
			{ "author": "angular" },
			{ "author": "岩明 均" }
		]
	};

	before( function( done ){
		Q.when( data )
		.then( fetchAuthorListAmazon )
		.done( function( resultData ){
			authorList = resultData.authorListInAmazon;
			done();
		});
	});

	it( 'テストが動作している', function( done ){
		(5).should.be.exactly(5);
		done();
    });

	it( 'fetchBookListは配列を返す', function(){
		authorList.should.be.instanceof( Array );
	});

	it( 'authorList配列は1つ以上の要素を持つ', function(){
		( authorList.length ).should.be.above(0);
	});

	it( 'authorList配列の要素は文字列である', function(){
		var i;
		for (i = 0; i < authorList.length; i++) {
			authorList[i].should.be.type('string');
		}
	});
});
