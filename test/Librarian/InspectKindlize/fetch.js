"use strict";

require('should');

var InspectKindlize = require('Librarian/InspectKindlize');
var Books;

describe('AuthorityASINのある書籍を500冊取得する', function(){
	this.timeout(0);

	before(function(done){
		InspectKindlize.fetch().then(function(books){
			Books = books;
			done();
		});
	});

	it("1冊以上の書籍が取得できる", function(){
		(Books.length).should.be.above(0);
	});

	it("500冊以下の書籍が取得できる", function(){
		(Books.length).should.be.below(501);
	});

});
