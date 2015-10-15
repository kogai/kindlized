'use strict';

var Q = require('q');
var express = require('express');
var router = express.Router();

var regist = require('routes/account/regist');
var login = require('routes/account/login');
var localPassport = login.localPassport;

const UserCollections = require('models/User');
const Utils = require('common/Utils')();

router.get('/login/success', function(req, res) {
  res.redirect(303, '/');
});

router.post(
  '/login',
  localPassport.authenticate(
    'local', {
      successRedirect: '/',
      failureRedirect: '/account/fail'
    }
  )
);

router.post('/logout', function(req, res) {
  delete req.session.passport.user;
  res.send('ログアウト完了しました。');
});

router.get('/verify', function(req, res) {
  let verifyId = req.query.id;
  let conditions = { verifyId: verifyId };
  let updates = { isVerified: true };
  let options = {
    new: true,
    upsert: true
  };
  UserCollections.findOneAndUpdate(conditions, updates, options, function(err, savedUser) {
    if (err) {
      Utils.postSlack(err);
      return res.status(403).send('認証は拒否されました。');
    }
    Utils.postSlack('[' + savedUser.mail + '] が新規ユーザーとして認証されました。');
    res.redirect(303, '/account/login');
  });
});

router.post('/regist', function(req, res) {
  regist({
    res: res,
    req: req
  });
});

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'ログイン'
  });
});

router.get('/register', function(req, res) {
  res.render('register', {
    title: 'アカウント登録'
  });
});

router.get('/', function(req, res) {
  res.redirect( 303, '/account/register');
});

module.exports = router;
