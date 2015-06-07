"use strict";

var Twitter = require('twitter');

function TwitterBot(credentials){
	if(!credentials.consumer_key){ throw new Error("Must set consumer_key."); }
	if(!credentials.consumer_secret){ throw new Error("Must set consumer_secret."); }
	if(!credentials.access_token_key){ throw new Error("Must set access_token_key."); }
	if(!credentials.access_token_secret){ throw new Error("Must set access_token_secret."); }

	this.consumer_key = credentials.consumer_key;
	this.consumer_secret = credentials.consumer_secret;
	this.access_token_key = credentials.access_token_key;
	this.access_token_secret = credentials.access_token_secret;
	this.client = new Twitter({
		consumer_key: this.consumer_key,
		consumer_secret: this.consumer_secret,
		access_token_key: this.access_token_key,
		access_token_secret: this.access_token_secret
	});
	return this;
}

TwitterBot.prototype.tweet = function(){
	this.client.post('statuses/update', { status: '私はBotになった'}, function(err, tweet, res){
		if(err){
			return console.log(err);
		}
		console.log(tweet);
	});
};

TwitterBot.prototype.getTweets = function(screen_name, callback){
	this.client.get('statuses/user_timeline', { screen_name: screen_name }, function(err, tweets, res){
		if(err){
			return callback(err);
		}
		callback(null, tweets);
	});
};

module.exports = function(credentials){
	return new TwitterBot(credentials);
};
