var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();
var verify 	= require( 'routes/account/verify' );
var regist 	= require( 'routes/account/regist' );
var login 	= require( 'routes/account/login' );
var localPassport = login.localPassport;

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
	res.render( 'account', {
		title: 'アカウント登録 | ログイン'
	});
});

module.exports = router;
