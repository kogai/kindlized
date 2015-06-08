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

	it("1冊以上書籍が取得できる", function(){
		console.log(Books);
		(Books.length).should.be.above(0);
	});

});
