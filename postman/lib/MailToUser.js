"use strict";

var MailToUser = {};

var log = require('common/log');

var inspectNotifiedBooks = require('postman/lib/inspectNotifiedBooks');
var inspectKindlizedBooks = require('postman/lib/inspectKindlizedBooks');
var insertMailTemplate = require('postman/lib/insertMailTemplate');
var sendKindlizedNotification = require('postman/lib/sendKindlizedNotification');
var modifyNotifiedStatus = require('postman/lib/modifyNotifiedStatus');

var Q = require('q');

MailToUser.send = function(user){
	var d = Q.defer();

	inspectNotifiedBooks(user)
	.then(inspectKindlizedBooks)
	.then(insertMailTemplate)
	.then(sendKindlizedNotification)
	.then(modifyNotifiedStatus)
	.done(function(user) {
		log.info(user._id + 'の処理が完了');
		d.resolve();
	});

	return d.promise;
};

MailToUser.inspectNotifiedBooks = inspectNotifiedBooks;
MailToUser.inspectKindlizedBooks = inspectKindlizedBooks;
MailToUser.insertMailTemplate = insertMailTemplate;
MailToUser.sendKindlizedNotification = sendKindlizedNotification;
MailToUser.modifyNotifiedStatus = modifyNotifiedStatus;

module.exports = MailToUser;
