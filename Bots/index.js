"use strict";

var twitterCredential = require('common/makeCredential')('twitter');
var log = require('common/log');

var TwitterBot = require('Bots/TwitterBot');
var AuthServer = require('Bots/AuthServer');
var Bots = {};

Bots.AuthServer = AuthServer();

Bots.AuthServer.listen(4000, function(){
	log.info("Authentication server start.");
});

Bots.TwitterBot = TwitterBot({
	consumer_key: twitterCredential.consumerKey,
	consumer_secret: twitterCredential.consumerSecret,
	screen_name: 'info_kindlize'
}, function(err, client){
	Bots.TwitterBot.listen();
});
