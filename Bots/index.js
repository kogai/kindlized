"use strict";

var twitterCredential = require('common/makeCredential')('twitter');
var TwitterBot = require('Bots/TwitterBot');
var AuthServer = require('Bots/AuthServer');
var Bots = {};

Bots.AuthServer = AuthServer();

Bots.AuthServer.listen(function(){
	console.log("Authentication server start.");
});

/*
Bots.TwitterBot = TwitterBot({
	consumer_key: twitterCredential.consumerKey,
	consumer_secret: twitterCredential.consumerSecret,
	access_token_key: twitterCredential.accessToken,
	access_token_secret: twitterCredential.accessTokenSecret
});

Bots.TwitterBot.tweet();

Bots.TwitterBot.getTweets('iamchawan', function(err, tweets){
	console.log(tweets[0].text);
});
*/
