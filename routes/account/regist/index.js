import Q from 'q';
import uuid from 'node-uuid';
import validator from 'validator';

import User from 'models/User';
import constant from 'common/constant';
import Mailer from 'common/Mailer';
import log from 'common/log';

const mailInfo = constant.mail.info;

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
  var verifyLink = req.protocol + '://' + req.get('host') + '/account/verify?id=' + verifyId;

  var sendHtml = '';
  sendHtml += 'アカウント認証のために以下のURLをクリックして下さい。<br>';
  sendHtml += verifyLink;
  data.verifyLink = verifyLink;
  data.sendHtml = sendHtml;

  d.resolve(data);

  return d.promise;
};

var sendVerifyMail = function(data) {
  const deffered = Q.defer();

  if (process.env.NODE_ENV === 'test') {
    console.log('...テスト環境ではメール送信をスキップする');
    deffered.resolve(data);
  } else {
    if (data.isRegisterd) {
      const verifyMailer = Mailer({
        from: mailInfo,
        to: data.mail,
        subject: '[kindlize.it]アカウント認証',
        text: data.sendHtml,
        html: data.sendHtml
      });

      verifyMailer.send(function(error, info) {
        if (error) {
          deffered.reject(error);
        }
        deffered.resolve(data);
      });
    } else {
      deffered.resolve(data);
    }
  }
  return deffered.promise;
};

var renderRouter = function(data) {
  var res = data.res;
  var d = Q.defer();

  const statusMessage = 'アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています。';
  res.send(statusMessage);
  d.resolve(data);

  return d.promise;
};

var renderFailRouter = function(data) {
  var res = data.res;
  var d = Q.defer();

  const statusMessage = 'アカウントの登録に失敗しました。\n登録済みのメールアドレスです。';
  res.status(403).send(statusMessage);
  d.resolve(data);

  return d.promise;
};

module.exports = function(data) {
  const candicdateMail = data.req.body.mail;
  if (!validator.isEmail(candicdateMail)) {
    return data.res.status(403).send('アカウントの登録に失敗しました。\nメールアドレスの形式が誤っています。');
  }
  makeNewUserModel(data)
  .then(makeMailTemplate)
  .then(sendVerifyMail)
  .then(renderRouter)
  .fail(renderFailRouter)
  .done(({mail})=> {
    log.info(`新規ユーザー登録完了: ${mail}`);
  });
};
