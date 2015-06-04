"use strict";

var Q = require('q');
var express = require('express');
var router = express.Router();
var verify = require('routes/account/verify');
var regist = require('routes/account/regist');
var login = require('routes/account/login');
var localPassport = login.localPassport;
var Author = require('models/Author');

router.get('/login/success', function(req, res) {
	res.redirect(303, '/');
});

router.post(
	'/login',
	localPassport.authenticate(
		'local', {
			successRedirect: '/',
			failureRedirect: '/account/fail'
		}
	)
);

router.post('/logout', function(req, res) {
	delete req.session.passport.user;
	res.send('ログアウト完了しました。');
});

router.get('/verify', function(req, res) {
	verify({
		res: res,
		req: req
	});
});

router.post('/regist', function(req, res) {
	regist({
		res: res,
		req: req
	});
});

router.get('/', function(req, res) {
	var isLogined = req.session.passport.user;
	var queryAuthorCount = Author.find().count();
	queryAuthorCount.exec(function(err, count){

		var randomSkip = Math.random() * (count - 1);
		var queryAuthors = Author.find({}).skip(randomSkip).limit(12);

		queryAuthors.exec(function(err, authors){
			res.render("account", {
				title: 'アカウント登録 | ログイン',
				authorLinks: authors,
				isLogined: isLogined
			});
		});
	});
});

module.exports = router;
