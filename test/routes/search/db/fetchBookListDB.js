"use strict";

require('should');
var fetchBookListDB = require('routes/search/lib/fetchBookListDB');
var mockData = {
	req:{
		body: {
			newBook: "塩田先生と雨井ちゃん"
		}
	}
};

describe('routes/search/lib/fetchBookListDB', function() {
	this.timeout(0);
	var bookListInDB;

	before(function(done){
		fetchBookListDB(mockData)
		.done(function(data){
			bookListInDB = data.bookListInDB;
			done();
		});
	});

	it("書籍がある", function(){
		(bookListInDB.length).should.be.above(0);
	});

});
