"use strict";

var moment = require('moment-timezone');

var BookList = require('models/BookList');
var Author = require('models/Author');
var log = require('common/log');

function Collector(opts){
	return this;
}

/**
@param { Object } book - 保存用に正規化された書籍のデータ
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
Collector.prototype.saveBook = function(book, done){
	var conditions = {
		ASIN: book.ASIN
	};

	BookList.findOne(conditions, function(err, book){
		// 既に書籍が存在していたらエラーハンドリングに回す
		if(err){ return done(err); }
		if(book){ return done(book.title + ' is already exists.'); }

		var newBook = new BookList({
			ASIN: book.ASIN,
			AuthorityASIN: book.AuthorityASIN,
			author: book.author,
			title: book.title,
			publisher: book.publisher,
			publicationDate: book.publicationDate,
			price: book.price,
			url: book.url,
			images: book.images,
			isKindlized: book.isKindlized,
			isKindlizedUrl: book.isKindlizedUrl,
			modifiedLog: {
				AddBookAt: moment(),
				InspectKindlizeAt: moment(),
				AddASINAt: moment(),
				UpdateUrlAt: moment()
			}
		});
		newBook.save(function(err){
			if(err){ return done(err); }
			done(null, newBook);
		});
	});
};

/**
@param { String } author - 保存する著者の名前
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
Collector.prototype.saveAuthor = function(author, done){
	var conditions = {
		name: author
	};

	Author.findOne(conditions, function(err, author){
		// 既に書籍が存在していたらエラーハンドリングに回す
		if(err){ return done(err); }
		if(author){ return done(author + ' is already exists.'); }

		var newAuthor = new Author({
			name: author,
			lastModified: moment()
		});
		newAuthor.save(function(err){
			if(err){ return done(err); }
			done(null, newAuthor);
		});
	});
};

/**
@param { Array } collections
@param { String } type
**/
Collector.prototype.saveCollections = function(collections, type){
	var _method;

	switch(type){
		case "authors":
			_method = this.saveAuthor;
			break;
		case "books":
			_method = this.saveBook;
			break;
	}

	collections.map(function(item){
		_method(item, function(err, savedItem){
			if(err){
				return log.info(err);
			}
		});
	});
};

module.exports = function(opts){
	var _opts = opts || {};
	return new Collector(_opts);
};
