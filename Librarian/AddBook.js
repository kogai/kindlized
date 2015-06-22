"use strict";

var util = require('util');
var moment = require('moment-timezone');
var Q = require('q');
var _ = require('underscore');

var Author = require('models/Author');
var Librarian = require('Librarian/Librarian');
var Operator = require('common/Operator');

var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
var LIMIT = require('common/constant').LIMIT.AUTHOR;

/**
@constructor
@classdesc Librarianクラスの継承クラス
@extends Librarian
**/
function AddBook(opts){
	Librarian.call(this, opts);
	this.books = [];
	this.completion = 0;
	this.limit = LIMIT;
	return this;
}

util.inherits(AddBook, Librarian);

/**
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
AddBook.prototype.sequential = function(done){
	var _self = this;

	if(this.total === 0){
		return done('This process has not any authors.');
	}

	if(this.completion === this.total){
		return done(null, this.books);
	}

	if(this.completion === 0){
		this.authors = _.compact(this.fetchedItems);
	}

	var authorName = this.authors[this.completion].name;
	var operator = Operator({
		type: "Author",
		query: authorName
	});

	operator.run(function(err, books){
		if(err){
			return done(err);
		}

		operator = null;
		log.info(authorName + ':' + books.length);

		_self.saveBooks(books, function(err){
			if(err){
				return log.info(err);
			}
			_self.completion++;
			_self.sequential(done);
		});


	});
};


/**
**/
AddBook.prototype.updateAuthors = function(done){
	var authors = this.fetchedItems;
	var Collector = require('common/Collector')('author');
	var update = { lastModified: moment() };

	Collector.updateCollections(authors, update, function(err){
		if(err){
			return done(err);
		}
		done();
	});
};

/**
**/
AddBook.prototype.saveBooks = function(books, done){
	var Collector = require('common/Collector')('book');
	var Operator = require('common/Operator')({
		type: "Title",
		query: "_" // Operator._normalizeを使うためにインスタンス化しているので、queryは無効な値で良い。
	});

	Collector.saveCollections(Operator._normalize(books), function(err, books){
		if(err){
			return done(err);
		}
		books.map(function(book){
			return log.info("新規登録書籍:" + book.title);
		});
		done();
	});
};


/**
**/
AddBook.prototype.run = function(done){
	var _self = this;
	var _methods = {};
	var functions = ["fetch", "sequential", "updateAuthors", "saveBooks"];

	functions.map(function(funcName){
		_methods["_" + funcName] = _self.defer(_self[funcName].bind(_self));
	});

	Q.when()
	.then(_methods._fetch)
	.then(_methods._sequential)
	.then(_methods._updateAuthors)
	.then(function(){
		_methods = null;
		_self.books = null;
		return done();
	})
	.fail(function(err){
		log.info(err);
		return done();
	});
};


AddBook.prototype.cron = function(){
	return this.defer(this.run.bind(this));
};

module.exports = function(opts){
	var _opts = opts || {};
	_opts.Model = Author;
	_opts.conditions = {
		$or: [
      { lastModified: { $lte: moment().subtract( PERIODICAL_DAY, 'days' ) } },
			{ lastModified: { $exists: false } }
    ]
	};

	return new AddBook(_opts);
};
