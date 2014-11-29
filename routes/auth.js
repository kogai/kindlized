var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
	passport.authenticate(
		'twitter',
		{
			successRedirect: '/',
			failureRedirect: '/login'
		}
	)
);

module.exports = router;