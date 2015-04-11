var express 		= require('express');
var router 			= express.Router();

router.get('/', function(req, res) {
	'use strict';
	var isLogined = req.session.passport.user;

	if( isLogined ){
		res.render( 'index', {
			title : 'ホーム',
		});
	}else{
		res.redirect( 303, '/account');
	}
});

module.exports = router;
