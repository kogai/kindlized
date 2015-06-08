"use strict";

var moment = require('moment-timezone');
var Q = require('q');

var BookList = require('models/BookList');
var LIMIT = process.argv[2];
var current = moment("2015-06-01");

function batchModifiedLog(opts){
	if(!opts.limit) { throw new Error("limitの指定が無い"); }
	if(!opts.modifier) { throw new Error("編集したい内容が無い"); }

	this.limit = opts.limit;
	this.modifier = opts.modifier;
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
			return console.log("err", err);
		}

		if((_self.index + 1) * LIMIT > maxBook){
			return console.log("Recursive process end.");
		}

		_self.update(books);
		_self.run(LIMIT, _self.index++);
	});
};

batchModifiedLog.prototype.update = function(books){
	var _self = this;
	Q.all(books.map(function(book){
		_self.Model.findOneAndUpdate({ ASIN: book.ASIN }, _self.modifier, function(err, book){
			if(err){
				return console.log(err);
			}
			console.log(book.title);
		});
	}))
	.done(function(){
		console.log("done.");
	});
};

var Batch = new batchModifiedLog({
	limit: LIMIT,
	modifier: {
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
