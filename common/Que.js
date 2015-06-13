"use strict";

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var INTERVAL_TWEET = require('common/constant').LIMIT.INTERVAL_TWEET;
var log = require('common/log');

function Que(){
	this.que = [];
	this.emitter = new EventEmitter();
	this.isHalt = true;
	this.INTERVAL = INTERVAL_TWEET;
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

/**
Que.queに格納されたデータを消費するメソッド
registerに登録しておいたイベントへ通知する
@param { String } type - 通知するイベント名
**/
Que.prototype.pull = function(type){
	var payload = this.que.shift();
	this.emitter.emit(type, payload);
};

/**
Que.pullメソッドをラップするメソッド
Que.queにデータがある限り、インターバルを挟んでQue.pullし続ける
@param { String } type - 通知するイベント名
**/
Que.prototype.consume = function(type){
	var _self = this, consumer;

	this.isHalt = false;
	consumer = setInterval(function(){
		_self.pull(type);
		if(_self.que.length === 0){
			_self.isHalt = true;
			clearInterval(consumer);
			return;
		}
	}, this.INTERVAL);
};

module.exports = function(){
	return new Que();
};
