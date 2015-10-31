import express from 'express';
const router = express.Router();

import {localPassport} from 'routes/account/login';

const UserCollections = require('models/User');
const Utils = require('common/Utils')();

router.get('/login/success', (req, res)=> {
  res.redirect(303, '/');
});

router.post('/login',
  localPassport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/fail',
  })
);

router.post('/logout', (req, res)=> {
  delete req.session.passport.user;
  res.send('ログアウト完了しました。');
});

router.get('/verify', (req, res)=> {
  const verifyId = req.query.id;
  const conditions = { verifyId: verifyId };
  const updates = { isVerified: true };
  const options = {
    new: true,
    upsert: true,
  };
  UserCollections.findOneAndUpdate(conditions, updates, options, (err, savedUser)=> {
    if (err) {
      Utils.postSlack(err);
      return res.status(403).send('認証は拒否されました。');
    }
    Utils.postSlack('[' + savedUser.mail + '] が新規ユーザーとして認証されました。');
    res.redirect(303, '/account/login');
  });
});

router.get('/login', (req, res)=> {
  const isLogin = req.session.passport.user;
  if (isLogin) {
    return res.redirect(303, '/');
  }
  res.render('login', {
    title: 'ログイン',
  });
});

router.get('/', (req, res)=> {
  res.redirect( 303, '/account/register');
});

module.exports = router;
