import Promise from 'bluebird';
import uuid from 'node-uuid';
import validator from 'validator';

import UserModel from 'models/User';
import constant from 'common/constant';
import Mailer from 'common/Mailer';
import Utils from 'common/Utils';

const mailInfo = constant.mail.info;
const utils = Utils();

function createNewUserModel(req) {
  const mail = req.body.mail;
  const password = req.body.password;
  const verifyId = uuid.v1();
  const isVerified = false;
  const bookList = [];

  const newUser = new UserModel({
    mail,
    password,
    verifyId,
    isVerified,
    bookList,
  });

  return new Promise((resolve, reject)=> {
    if (!validator.isEmail(mail)) {
      return reject({
        error: new Error('validation error'),
        message: 'アカウントの登録に失敗しました。\nメールアドレスの形式が誤っています。',
      });
    }
    newUser.save((err)=> {
      if (err) {
        return reject({
          error: err,
          message: 'アカウントの登録に失敗しました。\n登録済みのメールアドレスです。',
        });
      }
      resolve({ req, mail, verifyId });
    });
  });
}

function makeMailTemplate({ req, mail, verifyId }) {
  const mailer = Mailer({
    from: mailInfo,
    to: mail,
    subject: '[kindlize.it]アカウント認証',
  });
  const verifyLink = `${req.protocol}://${req.get('host')}/account/verify?id=${verifyId}`;
  return new Promise((resolve, reject)=> {
    mailer.createRegisterTemplate(verifyLink, (err)=> {
      if (err) {
        return reject({
          error: err,
          message: '何か予想外の事が起きてアカウントの登録に失敗しました。',
        });
      }
      resolve(mailer);
    });
  });
}

function sendVerifyMail(mailer) {
  return new Promise((resolve, reject)=> {
    if (process.env.NODE_ENV === 'test') {
      console.log('...テスト環境ではメール送信をスキップする');
      return resolve();
    }
    mailer.send((err)=> {
      if (err) {
        return reject(err);
      }
      utils.postSlack(`新規アカウント登録: ${mailer.to}`);
      resolve();
    });
  });
}

export default {
  get(req, res) {
    const isLogin = req.session.passport.user;
    if (isLogin) {
      return res.redirect(303, '/');
    }
    res.render('register', {
      title: 'アカウント登録',
      message: '',
    });
  },
  post(req, res) {
    createNewUserModel(req)
    .then(makeMailTemplate)
    .then(sendVerifyMail)
    .then(()=> {
      res.render('register', {
        title: 'アカウント登録',
        message: 'アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています。',
      });
    })
    .catch(({error, message})=> {
      utils.postSlack(error.toString()); // Slackで報告を入れておく
      res.status(403).render('register', {
        title: 'アカウント登録',
        message: message,
      });
    });
  },
};
