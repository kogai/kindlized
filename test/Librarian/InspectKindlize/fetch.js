"use strict";

require('should');
var moment = require('moment-timezone');

var InspectKindlize = require('Librarian/InspectKindlize')();
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var Books;

describe('AuthorityASINのある書籍を500冊取得する', function(){
	this.timeout(0);

	before(function(done){
		InspectKindlize._fetch().then(function(books){
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

	it('AuthorityASINを持っている', function(){
		var result = true, i;
		for (i = 0; i < Books.length; i++) {
			if(!Books[i].AuthorityASIN){
				result = false;
			}
		}
		result.should.be.exactly(true);
	});

	it('kindle化された書籍は含まれない', function(){
		var result = true, i;
		for (i = 0; i < Books.length; i++) {
			if(Books[i].isKindlized){
				result = false;
			}
		}
		result.should.be.exactly(true);
	});

	it('1日以上前に編集された書籍のみ', function(){
		var result = true, i, yesterday = moment().subtract(PERIODICAL_DAY, 'days'), modifiedDay;
		for (i = 0; i < Books.length; i++) {
			modifiedDay = Books[i].modifiedLog.InspectKindlizeAt;
			if(moment(modifiedDay).isAfter(yesterday)){
				result = false;
			}
		}
		result.should.be.exactly(true);
	});
});
