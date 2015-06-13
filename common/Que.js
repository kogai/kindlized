"use strict";

var EventEmitter = require('event').EventEmitter;
var util = require('util');
var INTERVAL_TWEET = require('common/constant').INTERVAL_TWEET;

function Que(){
	this.que = [];
	this.emitter = new EventEmitter();
	return this;
}

/**
@param { String } type - Publisherに登録するイベント名
@param { Function } callback - Publisherに登録する関数
**/
Que.prototype.register = function(type, callback){
	this.emitter.on(type, callback);
};

/**
@param { Array | String | Object } collections
**/
Que.prototype.push = function(collections){
	if(util.isArray(collections)){
		this.que = this.que.concat(collections);
	}else{
		this.que.push(collections);
	}
};


Que.prototype.pull = function(type){
	var payload = this.items.shift();
	this.emitter.emit(type, payload);
};

Que.prototype.delay = function(type){
	var _self = this;
	if(this.que.length > 0){
		setInterval(function(){
			_self.pull(type);
		}, INTERVAL_TWEET);
	}
};

module.exports = function(){
	return new Que();
};
