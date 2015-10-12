"use strict";

var MailToUser = {};

var log = require('common/log');

var inspectNotifiedBooks = require('Postman/lib/inspectNotifiedBooks');
var inspectKindlizedBooks = require('Postman/lib/inspectKindlizedBooks');
var insertMailTemplate = require('Postman/lib/insertMailTemplate');
var sendKindlizedNotification = require('Postman/lib/sendKindlizedNotification');
var modifyNotifiedStatus = require('Postman/lib/modifyNotifiedStatus');

var Q = require('q');

MailToUser.send = function(user){
  var d = Q.defer();

  inspectNotifiedBooks(user)
  .then(inspectKindlizedBooks)
  .then(insertMailTemplate)
  .then(sendKindlizedNotification)
  .then(modifyNotifiedStatus)
  .done(function(user) {
    log.info(user.mail + ' の処理が完了');
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
