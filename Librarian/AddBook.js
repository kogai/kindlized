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
AddBook.prototype.updateAuthors = function(){};
AddBook.prototype.updateBooks= function(){};
Collectorクラスにメソッドを追加する
**/


/**
**/
AddBook.prototype.run = function(){
	var _fetch = this.defer(this.fetch.bind(this));
	var _sequential = this.defer(this.sequential.bind(this));

	Q.when()
	.then(_fetch)
	.then(_sequential)
	.then(function(items){
		log.info(items);
	})
	.fail(function(err){
		return log.info(err);
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
