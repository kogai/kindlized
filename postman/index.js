"use strict";

var Q = require('q');

var fetchUserModel = require('postman/lib/fetchUserModel');
var MailToUser = require('postman/lib/MailToUser');
var inspectNewRelease = require('librarian/lib/inspectNewRelease');
var log = require('common/log');

module.exports = function() {
	// *1日に一度実行する
	Q.when()
	.then(inspectNewRelease)
	.then(fetchUserModel)
	.then(function(data) {

		var d = Q.defer();
		var users = data.users;

		Q.all(users.map(MailToUser.send))
			.done(function() {
				log.info('done');
				d.resolve(data);
			});

		return d.promise;
	})
	.done(function() {
		log.info('postmanの処理が完了');
	});
};
