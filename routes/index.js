var Q = require('q');
var express = require('express');
var router = express.Router();
var Mongodb = require('../models/db.user');
var Books = require('../models/db.books');
// var io = require('../bin/www');

/* GET home page. */
router.get('/', function(req, res) {
	if(!req.session.passport.user){
		//未ログインならregist画面に遷移
		res.redirect( 303 , '/regist' );
	}else{
		//ログイン済時の処理
		Mongodb.User.findOne( { "_id": req.session.passport.user }, function( err, user ){
			if(err) console.log(err);
			// console.log(res);
			var data = user.sendBooks
			console.log(data);
			res.render('index', {
				title : 'ホーム',
				users: user.mail,
				authors: user.sendBooks
			});
		});
	}
});

module.exports = router;