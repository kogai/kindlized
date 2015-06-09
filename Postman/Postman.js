"use strict";

var Q = require('q');

var MailToUser = require('Postman/lib/MailToUser');

var log = require('common/log');
var User = require('user/');

function Postman(){
	this.conditions = {
		isVerified: true
	};
	return this;
}

Postman.prototype.fetch = function(callback){
	User.find(this.conditions, callback);
};

Postman.prototype.run = function(){
	this.fetch(function(err, users){
		if(err){
			return log.info(err);
		}

		Q.all(users.map(MailToUser.send))
		.done(function(){
			log.info('全メールの配信が完了');
		});
	});
};

module.exports = function(){
	return new Postman();
};
