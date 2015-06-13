'use strict';

var express 		= require('express');
var router 			= express.Router();

var author = require('routes/author');
var mail = require('routes/mail');
var api = require('routes/api');

var log = require('common/log');

router.get('/', function(req, res) {
	var isLogin = req.session.passport.user;
	if(isLogin){
		res.render( 'index', {
			title : 'ホーム',
			isLogin: true
		});
	}else{
		res.redirect( 303, '/account/login');
	}
});

router.get('/author/*', author);
router.post('/mail', mail);

router.get('/api/search/db', api.search.db);
router.get('/api/search/amazon', api.search.amazon);

module.exports = router;
