"use strict";

require('should');

var Postman = require('Postman/Postman')();
var log = require('common/log');

describe('Postman.fetchメソッドのテスト', function(){
	var users;
	this.timeout(0);

	before(function(done){
		Postman.fetch(function(err, fetchedUsers){
			if(err){
				users = err;
				return done();
			}
			users = fetchedUsers;
			done();
		});
	});

	it("ユーザーが取得できる", function(){
		(users[0].mail).should.be.exactly('kogai0121@gmail.com');
	});
});
