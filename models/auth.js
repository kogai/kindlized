var credential = require('../credential');
var MongoDB = require('../models/mongodef');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new LocalStrategy({
		usernameField: 'mail',
		passwordField: 'pwd'
	},
	function( username , password , done) {
		MongoDB.User.findOne({ mail: username }, function(err, user) {
			if (err) { 
				console.log(err);
				return done(err);
			 }
			if (!user) {
				return done(null, false, { message: 'ユーザーIDが間違っています。' });
			}
			user.comparePassword( password , function( err , isMatch ) {
                if (err) return done(err);
                if (isMatch){
                	return done( null , user );
                }else{
                	return done(null, false, { message: 'パスワードが間違っています。' });
                };
            });
		});
	}
));

passport.use(new TwitterStrategy(
	{
		consumerKey: credential.twitter.consumerKey,
		consumerSecret: credential.twitter.consumerSecret,
		callbackURL: "http://192.168.10.7:3000/auth/twitter/callback"
	},
	function(token, tokenSecret, profile, done) {
		MongoDB.User.findOne( { twitterId: profile.id } , function(err, user) {
			if (err) { return done(err); }
			if (!user){
			    var newUser = new MongoDB.User({
			    	twitterId : profile.id,
			    	twitterName : profile.screen_name,
			        is_verify : 'UNVERIFIED',
			        is_seller : false,
			    });
			    // save to mongodb
			    newUser.save(function(err){
			        if(err){
			            res.render( 'regist', {
			                title : 'エラー',
			                is_visible : 'show'
			                // caution : err.errors.mail.message
			            });
			        }else{
			            console.log('regist is success');
						done(null, user);
			            // res.redirect( 303, '/login');
			        }
			    });
				console.log('user is unregitered.');
			}else{
				done(null, user);
			}
		});
	}
));

passport.serializeUser(function(user, done) {
  done( null, user.id );
});

passport.deserializeUser(function(id, done) {
  MongoDB.User.findById(id, function(err, user) {
    done( err, user );
  });
});

module.exports = passport;