"use strict";

var twitterCredential = require('common/makeCredential')('twitter');
var log = require('common/log');

var TwitterBot = require('Bots/TwitterBot');

var bot = TwitterBot({
	consumer_key: twitterCredential.consumerKey,
	consumer_secret: twitterCredential.consumerSecret,
	screen_name: 'info_kindlize'
}, function(err, client){
	if(err){
		return log.info(err);
	}
	bot.search(function(tweet){
		log.info(tweet.text);
	});
});
