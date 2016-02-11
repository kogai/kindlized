import localPassport from 'routes/account/login/lib/localPassport';
import passPortSerialize from 'routes/account/login/lib/passPortSerialize';

// シリアライズ関数をpassportインスタンスに登録
localPassport.serializeUser(passPortSerialize.serialize);
localPassport.deserializeUser(passPortSerialize.deSerialize);

export default {
  get(req, res) {
    const isLogin = req.session.passport.user;
    if (isLogin) {
      return res.redirect(303, '/');
    }
    res.render('login', {
      title: 'ログイン',
      entrypoint: 'with-server',
      isLogin: false,
    });
  },
  post: localPassport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/fail',
  }),
  success: {
    get(req, res) {
      res.redirect(303, '/');
    },
  },
};
