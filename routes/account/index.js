var Q 		= require( 'q' );
var express = require('express');
var router 	= express.Router();
var verify 	= require( 'routes/account/verify' );
var regist 	= require( 'routes/account/regist' );
var login 	= require( 'routes/account/login' );
var localPassport = login.localPassport;

router.post(
	'/login',
	localPassport.authenticate(
		'local',
		{
        	failureRedirect: '/account/fail'
		}
	),
	function( req, res){
		res.send( 'ログイン完了しました。' );
	}
);

router.post( '/logout', function( req, res ){
    delete req.session.passport.user;
    res.send( 'ログアウト完了しました。' );
});

router.get('/verify', function( req, res ) {
	console.log( 'verify is ', req.query.id );
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
