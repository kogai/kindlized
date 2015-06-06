"use strict";

require('should');

var log = require('common/log');
var MailToUser = require('postman/lib/MailToUser');
var User = require('user/');

var Result;

var sendMail = function(done){
	var Mailer = require('common/Mailer')({
		subject: "test",
		from: "notify@kindlize.it",
		to: "kogai0121@gmail.com",
		text: "mytext",
		html: "<p>mytext</p>"
	});

	Mailer.send(function(err, info){
		Result = info;
		done();
	});
};

describe('メールの送信テスト', function(){
	this.timeout(0);
	before(sendMail);
	it("メールはリジェクトされていない", function(){
		(Result.rejected.length).should.be.exactly(0);
	});
});
