export default {
  get(req, res) {
    const userSession = req.session.passport.user;
    const query = req.params.ASIN;
    if (!userSession) {
      return res.redirect(303, '/account/login');
    }
    if (!query) {
      return res.redirect(303, '/');
    }
    res.status(200).send();
  },
};
