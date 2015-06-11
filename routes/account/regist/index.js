"use strict";

var Q = require('q');
var uuid = require('node-uuid');
var nodemailer = require('nodemailer');

var User = require('user/');
var mailInfo = require('common/constant').mail.info;
var Mailer = require('common/Mailer');
var log = require('common/log');

var makeNewUserModel = function(data) {
  var d = Q.defer();

  var verifyId = uuid.v1();
  var req = data.req;
  var mail = req.body.mail;
  var password = req.body.password;

  var newUser = new User({
    mail: mail,
    password: password,
    verifyId: verifyId,
    isVerified: false,
    bookList: []
  });

  data.verifyId = verifyId;
  data.mail = mail;
  data.password = password;
  data.newUser = newUser;

  newUser.save(function(err) {
    if (err) {
      data.isRegisterd = false;
      data.isRegisterdError = err;
      d.reject(data);
    } else {
      data.isRegisterd = true;
      d.resolve(data);
    }
  });
  return d.promise;
};

var makeMailTemplate = function(data) {
  var d = Q.defer();
  var req = data.req;
  var verifyId = data.verifyId;
  var verifyLink = req.protocol + '://' + req.get('host') + "/account/verify?id=" + verifyId;

  var sendHtml = '';
  sendHtml += 'アカウント認証のために以下のURLをクリックして下さい。<br>';
  sendHtml += verifyLink;
  data.verifyLink = verifyLink;
  data.sendHtml = sendHtml;

  d.resolve(data);

  return d.promise;
};

var sendVerifyMail = function(data) {
  var d = Q.defer();

  if (data.isRegisterd) {
    var verifyMailer = Mailer({
      from: mailInfo,
      to: data.mail,
      subject: "[kindlize.it]アカウント認証",
      text: data.sendHtml,
      html: data.sendHtml
    });

    verifyMailer.send(function(error, info){
      if(error){
        d.reject(error);
      }
      d.resolve(data);
    });
  }else{
    d.resolve(data);
  }

  return d.promise;
};

var renderRouter = function(data) {
  var res = data.res;
  var d = Q.defer();

  var statusMessage = 'アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています。';
  res.send(statusMessage);
  d.resolve(data);

  return d.promise;
};

var renderFailRouter = function(data) {
  var res = data.res;
  var d = Q.defer();

  var statusMessage = 'アカウントの登録に失敗しました。\n登録済みのメールアドレスです。';
  res.send(statusMessage);
  d.resolve(data);

  return d.promise;
};

module.exports = function(data) {
  makeNewUserModel(data)
  .then(makeMailTemplate)
  .then(sendVerifyMail)
  .then(renderRouter)
  .fail(renderFailRouter)
  .done(function(data) {
    log.info(data.mail + ':新規ユーザー登録完了');
  });
};
