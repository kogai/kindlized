var Q = require('q');
var express = require('express');
var router = express.Router();
var User = require('../models/db.user');
var Books = require('../models/db.books');

/* GET home page. */
router.get('/', function(req, res) {
	if(!req.session.passport.user){
		//未ログインならregist画面に遷移
		res.redirect( 303 , '/regist' );
	}else{
		User.User.findOne( { "_id": req.session.passport.user }, function( err, user ){
			if(err) console.log(err);
			res.render('index', {
				title : 'ホーム',
				users: user.mail
			});
		});
	}
});

module.exports = router;