"use strict";

var moment = require('moment-timezone');
var Q = require('q');

var BookList = require('models/BookList');
var LIMIT = process.argv[2];
var current = moment("2015-06-01");
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
			query = this.Model.find().count();

	query.exec(function(err, count){
		_self.recursive(count);
	});
};

batchModifiedLog.prototype.recursive = function(maxBook){
	var _self = this,
			query = this.Model.find({}).skip(this.index * LIMIT).limit(LIMIT);

	query.exec(function(err, books){
		if(err){
			return log.info("err", err);
		}

		if((_self.index + 1) * LIMIT > maxBook){
			return log.info("Recursive process end.");
		}

		_self.update(books);
		_self.run(LIMIT, _self.index++);
	});
};

batchModifiedLog.prototype.update = function(collections){
	var _self = this;
	Q.all(collections.map(function(collection){
		_self.Model.findOneAndUpdate({ ASIN: collection.ASIN }, _self.update, function(err, collection){
			if(err){
				return log.info(err);
			}
			log.info(collection.title);
		});
	}));
};

var Batch = new batchModifiedLog({
	limit: LIMIT,
	conditions: {},
	update: {
		modifiedLog: {
			AddBookAt: current,
			InspectKindlizeAt: current,
			AddASINAt: current,
			UpdateUrlAt: current
		}
	},
	Model: BookList
});
Batch.run();
