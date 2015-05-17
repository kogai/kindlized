var express 		= require('express');
var router 			= express.Router();

var author = require('routes/author');

router.get('/', function(req, res) {
	'use strict';
	var isLogined = req.session.passport.user;

	if( isLogined ){
		res.render( 'index', {
			title : 'ホーム'
		});
	}else{
		res.redirect( 303, '/account');
	}
});

router.get('/author/*', author);

module.exports = router;
