"use strict";

var app = require('express')();
var server = require('http').Server(app).listen(5000);
var io = require('socket.io')(server);

var Twitter = require('twitter');
var AuthBot = require('models/AuthBot');
var log = require('common/log');

function TwitterBot(credentials, callback){
	if(!credentials.consumer_key){ throw new Error("Must set consumer_key."); }
	if(!credentials.consumer_secret){ throw new Error("Must set consumer_secret."); }

	if((!credentials.access_token_key && !credentials.access_token_secret) && !credentials.screen_name){
		throw new Error("Must set access_token_key and access_token_secret or screen_name.");
	}

	this.consumer_key = credentials.consumer_key;
	this.consumer_secret = credentials.consumer_secret;

	// アクセストークンが渡されていればそのまま使う
	if(credentials.access_token_key && credentials.access_token_secret){
		this.access_token_key = credentials.access_token_key;
		this.access_token_secret = credentials.access_token_secret;
	}

	// ユーザーアカウント名が渡されていればDBをルックアップ
	if(credentials.screen_name){
		var _self = this;
		AuthBot.findOne({ screen_name: credentials.screen_name }, function(err, bot){
			if(err){
				return callback(err);
			}
			_self.access_token_key = bot.accessToken;
			_self.access_token_secret = bot.accessTokenSecret;

			_self.client = new Twitter({
				consumer_key: _self.consumer_key,
				consumer_secret: _self.consumer_secret,
				access_token_key: _self.access_token_key,
				access_token_secret: _self.access_token_secret
			});
			callback(null, _self.client);
			return _self;
		});
	}else{
		this.client = new Twitter({
			consumer_key: this.consumer_key,
			consumer_secret: this.consumer_secret,
			access_token_key: this.access_token_key,
			access_token_secret: this.access_token_secret
		});
		callback(null, this.client);
		return this;
	}
}

TwitterBot.prototype.tweet = function(tweetStrng){
	this.client.post('statuses/update', { status: tweetStrng }, function(err, tweet, res){
		if(err){
			return log.info(err);
		}
		log.info(tweet.created_at + tweet.text);
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

TwitterBot.prototype.listen = function(){
	var _self = this;
	log.info('Botsサービスを起動');
	io.on('connection', function(socket){
		log.info('Botsサービスのクライアントを接続');
		socket.on('librarian-kindlized', function(book){
			_self.tweet("『" + book.title + "』がkindle化されました。 " + book.url);
		});
	});
};

module.exports = function(credentials, callback){
	return new TwitterBot(credentials, callback);
};
