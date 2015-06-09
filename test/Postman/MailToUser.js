"use strict";

require('should');

var log = require('common/log');
var MailToUser = require('Postman/lib/MailToUser');
var User = require('user/');


var Result;

var sendMail = function(done){
	User.findOne({
		mail: "kogai0121@gmail.com"
	}, function(err, user){
		if(err){
			return log.info(err);
		}

		user.sendHtml = 'test';
		user.kindlizedList = ['書籍の配列が入る'];

		MailToUser.sendKindlizedNotification(user)
		.done(function(user){
			Result = user.info;
			done();
		});
	});
};

describe('メールの送信テスト', function(){
	this.timeout(0);
	before(sendMail);
	it("メールはリジェクトされていない", function(){
		(Result.rejected.length).should.be.exactly(0);
	});
});
