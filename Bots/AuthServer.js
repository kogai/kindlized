"use strict";

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');
var app = express();
var router = express.Router();

var sessinCredential = require('common/makeCredential')('session');

function AuthServer(){
	this.app = app;

	this.app.use(bodyParser());
	this.app.use(cookieParser());
	this.app.use(session({
		secret: sessinCredential,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	}));

	this.app.use(passport.initialize());
	this.app.use(passport.session());

	router.post('/twitter', function(req, res){
		res.send('ok');
	});

	this.app.use(router);

	return this;
}

AuthServer.prototype.listen = function(callback){
	this.app.listen(process.env.PORT || 3000, callback);
};

module.exports = function(){
	return new AuthServer();
};
