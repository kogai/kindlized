import express from 'express';
const router = express.Router();

const UserCollections = require('models/User');
const Utils = require('common/Utils')();

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

router.get('/', (req, res)=> {
  res.redirect( 303, '/account/register');
});

module.exports = router;
