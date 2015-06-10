"use strict";

var moment = require('moment-timezone');
require('should');

var log = require("common/log");
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var AddASIN = require('Librarian/AddASIN')({ limit: 50 });

describe('AuthorityASINを持たない書籍のデータ取得メソッド', function(){
	this.timeout(0);
	var fetchedBooks;

	before(function(done){
		AddASIN.fetch(function(err, books){
			if(err){
				fetchedBooks = err;
				return log.info(err);
			}
			fetchedBooks = books;
			done();
		});
	});

	it('AuthorityASINプロパティに有効な値をもたない', function(){
		var i, result = true, hasLength;
		for (i = 0; i < fetchedBooks.length; i++) {
			try{
				hasLength = fetchedBooks[i].AuthorityASIN[0].length > 0;
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

	it('1日以上前に編集された書籍のみ', function(){
		var result = true, i, yesterday = moment().subtract(PERIODICAL_DAY, 'days'), modifiedDay;
		for (i = 0; i < fetchedBooks.length; i++) {
			modifiedDay = fetchedBooks[i].modifiedLog.AddASINAt;
			if(moment(modifiedDay).isAfter(yesterday)){
				result = false;
			}
		}
		result.should.be.exactly(true);
	});

});
