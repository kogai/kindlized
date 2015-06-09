"use strict";

require('should');

var log = require("common/log");
var RepairImg = require('Librarian/RepairImg')({
	limit: 50
});

describe('画像を持たない書籍のデータ取得メソッド', function(){
	this.timeout(0);
	var fetchedBooks;

	before(function(done){
		RepairImg.fetch(function(err, books){
			if(err){
				return log.info(err);
			}
			fetchedBooks = books;
			done();
		});
	});

	it('imagesプロパティに有効な値をもたない', function(){
		var i, result = true, hasLength;
		for (i = 0; i < fetchedBooks.length; i++) {
			try{
				hasLength = fetchedBooks[i].images.length > 0;
			}catch(e){
				hasLength = undefined;
			}

			if(hasLength){
				result = false;
			}
			hasLength = undefined;
		}
		result.should.be.exactly(true);
	});

});
