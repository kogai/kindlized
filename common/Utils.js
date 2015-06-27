"use strict";

var Q = require('q');
var _ = require('underscore');
var request = require('superagent');

var log = require('common/log');

function Utils(){
	this.slackAPI = require('credential.js').slack;
}


/**
引数にコールバック関数を持つメソッドをPromiseオブジェクトを返す関数でラップする
@param { Function } method - callback関数を引数に持つメソッド
@example
var _method = this.defer(this.method.bind(this));
_method().done(function(items){ console.log(items, "done."); });
**/
Utils.prototype.defer = function(method){
	return function(){
		var d = Q.defer();
		var args = Array.prototype.slice.call(arguments);
				args = _.compact(args);

		// methodに渡されているdoneコールバック関数を
		// Promiseのdefer.resolve/rejectする関数
		args.push(function(err, res){
			if(err){
				return d.reject(err);
			}
			d.resolve(res);
		});

		method.apply(this, args);

		return d.promise;
	};
};


Utils.prototype.map = function(collections, method, done){
	Q.all(collections.map(function(item){
		var d = Q.defer();

		method(item, function(err, result){
			if(err){
				return d.reject(err);
			}
			d.resolve(result);
		});

		return d.promise;
	}))
	.then(function(results){
		done(null, results);
	})
	.fail(function(err){
		done(err);
	});
};


/**
@param { String } msg - Slackに通知するメッセージ
**/
Utils.prototype.postSlack = function(msg, done){
	request
	.post(this.slackAPI)
	.send({
		text: msg
	})
	.end(function(err, ret){
		if(err){
			return done(err);
		}
		if(done){
			return done(null, ret);
		}
	});
};


module.exports = function(){
	return new Utils();
};
