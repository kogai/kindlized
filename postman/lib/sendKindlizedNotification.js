"use strict";

// メールを送信

var Q = require('q');
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

var log = require('common/log');
var credentialMandrill = require('common/makeCredential')('mandrill');
var mailInfo = require('common/constant').mail.info;
var Mailer = require('common/Mailer');

module.exports = function(user) {
  var d = Q.defer();
  var kindlizedList = user.kindlizedList;

  if (kindlizedList.length > 0) {
    // kindle化通知の対象書籍があったら通知する
    var notifyMailer = Mailer({
      from: mailInfo,
      to: user.mail,
      subject: "[kindlize.it] 登録していた書籍がKindle化されました",
      text: user.sendHtml,
      html: user.sendHtml
    });

    notifyMailer.send(function(err, info){
      if (err) {
        user.info = err;
      }
      user.info = info;
      d.resolve(user);
    });

  }else{
    d.resolve(user);
  }

  return d.promise;
};
