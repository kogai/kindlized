var express 		= require('express');
var router 			= express.Router();

var author = require('routes/author');

router.get('/', function(req, res) {
	'use strict';
	var isLogin = req.session.passport.user;

	if( isLogin ){
		res.render( 'index', {
			title : 'ホーム',
			isLogin: true
		});
	}else{
		res.redirect( 303, '/account');
	}
});

router.get('/author/*', author);

module.exports = router;
