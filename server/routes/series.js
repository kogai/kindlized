export default {
  get(req, res) {
    const isLogin = req.session.passport.user;
    if (!isLogin) {
      return res.redirect(303, '/account/login');
    }
    res.render('index', {
      title: 'シリーズ',
      entrypoint: 'series',
      isLogin: true,
    });
  },
};
