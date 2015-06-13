"use strict";

var util = require('util');
var moment = require('moment-timezone');

var log = require('common/log');

/**
@constructor
**/
function Collector(opts){
	if(!opts.type || typeof opts.type !== 'string'){
		throw new Error('string型のtypeプロパティは必須');
	}
	this.type = opts.type;

	switch(opts.type){
		case "author":
			this._saveMethod = this.saveAuthor;
			this._Model = require('models/Author');
			break;
		case "book":
			this._saveMethod = this.saveBook;
			this._Model = require('models/BookList');
			break;
	}

	return this;
}

/**
@param { Object } book - 保存用に正規化された書籍のデータ
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
Collector.prototype.saveBook = function(book, done){
	if(typeof book !== 'object' || util.isArray(book)){
		throw new Error('saveBook method required Object parametor.');
	}
	if(typeof done !== 'function' || !done){
		throw new Error('saveBook method required Function parametor.');
	}
	if(!book.ASIN){
		throw new Error('book param required ASIN property.');
	}
	if(!book.author){
		throw new Error('book param required author property.');
	}
	if(!book.title){
		throw new Error('book param required title property.');
	}

	var conditions = {
		ASIN: book.ASIN
	};
	var BookList = this._Model;

	BookList.findOne(conditions, function(err, existBook){
		// 既に書籍が存在していたらエラーハンドリングに回す
		if(err){ return done(err); }
		if(existBook){ return done(existBook.title + ' is already exists.'); }

		var newBook = new BookList({
			ASIN: book.ASIN,
			AuthorityASIN: book.AuthorityASIN || [''],
			author: book.author,
			title: book.title,
			publisher: book.publisher || [''],
			publicationDate: book.publicationDate || [''],
			price: book.price || [''],
			url: book.url || [''],
			images: book.images || '',
			isKindlized: book.isKindlized || false,
			isKindlizedUrl: book.isKindlizedUrl || false,
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
	var Author = this._Model;

	Author.findOne(conditions, function(err, existAuthor){
		// 既に書籍が存在していたらエラーハンドリングに回す
		if(err){ return done(err); }
		if(existAuthor){ return done(existAuthor.name + ' is already exists.'); }

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
**/
Collector.prototype.saveCollections = function(collections){
	var _self = this;

	collections.map(function(item){
		_self._saveMethod(item, function(err, savedItem){
			if(err){
				return log.info(err);
			}
			log.info(savedItem);
		});
	});
};

module.exports = function(opts){
	var _opts = opts || {};
	return new Collector(_opts);
};
