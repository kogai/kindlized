var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();
var verify 	= require( 'routes/account/verify' );
var regist 	= require( 'routes/account/regist' );
var login 	= require( 'routes/account/login' );
var localPassport = login.localPassport;

router.get( '/login/success', function( req, res ){
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
	),
	function( req, res ){
		res.redirect( 307, '/aaa' );
	}
);

router.post( '/logout', function( req, res ){
    delete req.session.passport.user;
    res.send( 'ログアウト完了しました。' );
});

router.get('/verify', function( req, res ) {
	verify({
		res: res,
		req: req
	});
});

router.post('/regist', function( req, res ) {
	regist({
		res: res,
		req: req
	});
});

router.get('/', function( req, res ) {
	res.render( 'account', {
		title: 'アカウント'
	});
});

module.exports = router;
