export default {
  get(req, res) {
    const userSession = req.session.passport.user;
    if (!userSession) {
      return res.redirect(303, '/account/login');
    }
    res.status(200).send();
  },
};
