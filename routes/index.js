var express 		= require('express');
var router 			= express.Router();

var author = require('routes/author');
var mail = require('routes/mail');
var api = require('routes/api');

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
router.post('/mail', mail);

router.post('/api/search', api.search);

module.exports = router;
