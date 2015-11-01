import express from 'express';
const router = express.Router();

import register from 'routes/register';
import author from 'routes/author';
import mail from 'routes/mail';
import api from 'routes/api';
import accountLogin from 'routes/account/login';
import accountRegister from 'routes/account/register';

router.get('/', (req, res)=> {
  const isLogin = req.session.passport.user;
  if (isLogin) {
    res.render('index', {
      title: 'ホーム',
      isLogin: true,
    });
  } else {
    res.redirect(303, '/account/login');
  }
});

router.get('/register', register.get);
router.get('/author/*', author);
router.post('/mail', mail);

router.get('/account/login', accountLogin.get);
router.post('/account/login', accountLogin.post);
router.get('/account/login/success', accountLogin.success.get);

router.get('/account/register', accountRegister.get);
router.post('/account/register', accountRegister.post);

router.get('/api/search/db', api.search.db);
router.get('/api/search/amazon', api.search.amazon);

router.get('/api/user/account', api.user.account.get);
router.put('/api/user/account', api.user.account.put);

router.get('/api/user/book', api.user.book.get);
router.post('/api/user/book', api.user.book.post);
router.delete('/api/user/book', api.user.book.delete);

// router.get('/api/user/count', api.user.count.get);
router.get('/api/user/book/:page', api.user.page.get);

router.get('/api/user/series', api.user.series.get);
router.post('/api/user/series', api.user.series.post);
router.delete('/api/user/series', api.user.series.delete);

module.exports = router;
