var express = require('express');
var router = express.Router();
var MongoDB = require('../models/mongodef');

/* GET home page. */
router.get('/', function(req, res) {
	if(!req.session.passport.user){
		res.redirect( 303 , '/regist' );
	}else{
		MongoDB.User.findOne( { _id : req.session.passport.user } , function( err , user ){
			if(err) console.log(err);
			res.render('index', {
				title : 'ホーム',
				users: user.mail
			});
		});
	}
});

module.exports = router;