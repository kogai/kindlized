"use strict";

var moment = require('moment-timezone');
var Q = require('q');

var log = require('common/log');

function batchModifiedLog(opts){
	if(!opts.limit) { throw new Error("limitの指定が無い"); }
	if(!opts.conditions) { throw new Error("検索条件が無い"); }
	if(!opts.update) { throw new Error("編集したい内容が無い"); }
	if(!opts.Model) { throw new Error("編集したいCollectionが無い"); }

	this.limit = opts.limit;
	this.conditions = opts.conditions;
	this.update = opts.update;
	this.Model = opts.Model;
	this.index = 0;
}

batchModifiedLog.prototype.run = function(){
	var _self = this,
			query = this.Model.find(this.conditions).count();

	query.exec(function(err, count){
		_self.recursive(count);
	});
};

batchModifiedLog.prototype.recursive = function(maxBook){
	var _self = this;
	var query = this.Model.find(this.conditions).skip(this.index * this.limit).limit(this.limit);

	query.exec(function(err, books){
		if(err){
			return log.info("err", err);
		}
		if((_self.index + 1) * _self.limit > maxBook){
			return log.info("Recursive process end.");
		}

		_self.findAndUpdate(books);
		_self.run(_self.limit, _self.index++);
	});
};

batchModifiedLog.prototype.findAndUpdate = function(collections){
	var _self = this;

	Q.all(collections.map(function(collection){
		_self.Model.findOneAndUpdate({ ASIN: collection.ASIN }, _self.update, function(err, collection){
			if(err){
				return log.info(err);
			}
			log.info(collection.modifiedLog + ':' + collection.title);
		});
	}));
};

module.exports = batchModifiedLog;
