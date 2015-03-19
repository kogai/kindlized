var express 		= require('express');
var router 			= express.Router();
var modelBookList 	= require( '../shelf/lib/modelBookList' );

router.get('/', function(req, res) {
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
