"use strict";

var Q = require('q');

var MailToUser = require('Postman/lib/MailToUser');
var Librarian = require('Librarian/Librarian');

var log = require('common/log');
var User = require('models/User');

function Postman(){
	this.conditions = {
		isVerified: true
	};
	this.users = [];
	this.Librarian = new Librarian();
	this._defer = this.Librarian.defer;

	return this;
}

Postman.prototype.fetch = function(done){
	var _self = this;
	User.find(this.conditions, function(err, users){
		if(err){
			return done(err);
		}
		_self.users = users;
		done(null, users);
	});
};

Postman.prototype.sent = function(done){
	Q.all(this.users.map(MailToUser.send))
	.then(function(){
		done();
	})
	.fail(function(err){
		done(null, err);
	});
};

Postman.prototype.run = function(){
	var _fetch = this._defer(this.fetch.bind(this));
	var _sent = this._defer(this.sent.bind(this));

	Q.when()
	.then(_fetch)
	.then(_sent)
	.then(function(){
		log.info('全メールの配信が完了');
	})
	.fail(function(err){
		log.info(err);
	});
};

module.exports = function(){
	return new Postman();
};
