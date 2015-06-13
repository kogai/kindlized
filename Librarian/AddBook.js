"use strict";

var util = require('util');
var moment = require('moment-timezone');
var Q = require('q');

var Author = require('models/Author');
var Librarian = require('Librarian/Librarian');

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
		this.authors = this.fetchedItems;
	}

	var authorName = this.authors[this.completion].name;
	var Operator = require('common/Operator')({
		type: "Author",
		query: authorName
	});

	Operator.run(function(err, books){
		if(err){
			return done(err);
		}
		log.info(authorName + ':' + books.length);
		_self.books = _self.books.concat(books);
		_self.completion++;
		_self.sequential(done);
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
AddBook.prototype.saveBooks = function(done){
	var books = this.books;
	var Collector = require('common/Collector')('book');
	var Operator = require('common/Operator')({
		type: "Title",
		query: "_"
	});

	Collector.saveCollections(Operator._normalize(books), function(err, books){
		if(err){
			return done(err);
		}
		done(books);
	});
};


/**
**/
AddBook.prototype.run = function(done){
	var _self = this;
	var methods = {};
	var functions = ["fetch", "sequential", "updateAuthors", "saveBooks"];

	functions.map(function(funcName){
		methods["_" + funcName] = _self.defer(_self[funcName].bind(_self));
	});

	Q.when()
	.then(methods._fetch)
	.then(methods._sequential)
	.then(methods._updateAuthors)
	.then(methods._saveBooks)
	.then(function(){
		return done();
	})
	.fail(function(err){
		return done(err);
	});
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
