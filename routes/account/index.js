var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();
var verify 	= require( 'routes/account/verify' );
var regist 	= require( 'routes/account/regist' );
var login 	= require( 'routes/account/login' );
var localPassport = login.localPassport;
var Author = require('models/Author');

router.get( '/login/success', function( req, res ){
	"use strict";
	res.redirect( 303, '/' );
});

router.post(
	'/login',
	localPassport.authenticate(
		'local',
		{
			successRedirect: '/',
			failureRedirect: '/account/fail'
		}
	)
);

router.post( '/logout', function( req, res ){
	"use strict";
	delete req.session.passport.user;
	res.send( 'ログアウト完了しました。' );
});

router.get('/verify', function( req, res ) {
	"use strict";
	verify({
		res: res,
		req: req
	});
});

router.post('/regist', function( req, res ) {
	"use strict";
	regist({
		res: res,
		req: req
	});
});

router.get('/', function( req, res ) {
	"use strict";
	Author.find({}, function(err, authors){
		if(err){
			console.log(err);
			return err;
		}
		res.render( 'account', {
			title: 'アカウント登録 | ログイン',
			authorLinks: (function(authors){
				var rand = Math.floor(Math.random() * (authors.length - 1) + 1 );
				var limitedAuthor = [];
				var i;
				if(rand + 12 >= authors.length ){
					rand -= 12;
				}
				for (i = rand; i < rand + 12; i++) {
					limitedAuthor.push(authors[i]);
				}
				return limitedAuthor;
			}(authors))
		});
	});
});

module.exports = router;
