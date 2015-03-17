var Q = require('q');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var modelUser       = require('user/lib/modelUser');

var LocalStrategyField = {
	usernameField: 'mail',
	passwordField: 'password'
}

var LocalStrategyCallBack = function( username, password, done ){
	modelUser.findOne({ mail: username }, function(err, user) {
		if (err) {
			console.log( 'LocalStrategyCallBackのエラー', err );
			return done(err);
		 }
		if (!user) {
			return done(null, false, { message: 'ユーザーIDが間違っています。' });
		}
        /*
		user.comparePassword( password , function( err , isMatch ) {
            if (err) return done(err);
            if (isMatch){
            	return done( null , user );
            }else{
            	return done(null, false, { message: 'パスワードが間違っています。' });
            }
        });
        */
	});

};

passport.use(
    new LocalStrategy( LocalStrategyField, LocalStrategyCallBack )
);

module.exports = passport;
