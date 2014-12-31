module.exports = function(req,res){
    delete req.session.passport.user;
    res.redirect( 303, '/login');
};