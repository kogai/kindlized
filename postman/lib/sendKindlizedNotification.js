"use strict";

// メールを送信

var Q = require('q');
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

var makeCredential = require('common/makeCredential');
var log = require('common/log');
var mailInfo = require('common/constant').mail.info;

module.exports = function(user) {
  var d = Q.defer();
  var sendHtml = user.sendHtml;
  var kindlizedList = user.kindlizedList;

  if (kindlizedList.length > 0) {
    // kindle化通知の対象書籍があったら通知する
    var credentialMandrill = makeCredential('mandrill');

    var transporter = nodemailer.createTransport(mandrillTransport({
      auth: {
        apiKey: credentialMandrill
      }
    }));

    var mailOptions = {
      from: 'kindlize.it <' + mailInfo + '>',
      to: user.mail,
      subject: '登録していた書籍がKindle化されました',
      text: sendHtml,
      html: sendHtml
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        user.info = error;
      }
      user.info = info;
      d.resolve(user);
    });
  }else{
    d.resolve(user);
  }

  return d.promise;
};
