"use strict";

var util = require('util');
var Q = require('q');
var moment = require('moment-timezone');

var Librarian = require('Librarian/Librarian');
var promiseSerialize = require('common/promiseSerialize');
var log = require('common/log');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

/**
@constructor
@classdesc Librarianクラスの継承クラス<br>Imageの更新を行う
@extends Librarian
**/
function UpdateUrl(opts){
	Librarian.call(this, opts);
}

util.inherits(UpdateUrl, Librarian);


UpdateUrl.prototype._addConditions = function(books){
	return books.map(function(book){
		book.conditions = { ItemId: book.AuthorityASIN[0] };
		return book;
	});
};

/**
	UpdateUrl.updateのラッパー
	@param { Object } book - 書籍データのオブジェクト
	@return { Object } modifiedBook 書籍データのオブジェクト
**/
UpdateUrl.prototype._updates = function(book){
	var d = Q.defer();
	var update = {}, url, isKindlizedUrl;

	try{
		url = book.res.ItemLookupResponse.Items[0].Item[0].DetailPageURL[0];
		isKindlizedUrl = true;
		log.info('URL更新:' + book.title);
	}catch(e){
		url = book.url;
		isKindlizedUrl = null;
		log.info('URL未更新:' + book.title);
	}

	update.url = url;
	update.isKindlizedUrl = isKindlizedUrl;
	update.modifiedLog = {
		UpdateUrlAt: moment()
	};

	this.update(book, update, function(err, modifiedBook){
		if(err){
			return d.reject(err);
		}
		d.resolve(modifiedBook);
	});

	return d.promise;
};

UpdateUrl.prototype.run = function(callback){
	var _fetch = this.fetch.bind(this);
	var _sequential = this.sequential.bind(this);
	var _self = this;

	Q.when()
	.then(function(){
		var d = Q.defer();
		_fetch(function(err, books){
			if(err){
				return log.info(err);
			}
			var conditinalizeBooks = _self._addConditions(books);
			d.resolve(conditinalizeBooks);
		});

		return d.promise;
	})
	.then(function(books){
		var d = Q.defer();

		_sequential(books, function(err, modifiedBooks){
			d.resolve(modifiedBooks);
		});

		return d.promise;
	})
	.then(function(books){
		var d = Q.defer();

		var ebooks = books.map(function(book){
			var ebook = _self.inspectEbook(book.res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem);
			if(ebook.hasEbook){
				book.ASIN = [ebook.ebookASIN];
			}
			book.conditions = null;
			book.res = null;
			return book;
		});

		_sequential(ebooks, function(err, modifiedEbooks){
			d.resolve(modifiedEbooks);
		});

		return d.promise;
	})
	.done(function(books){
		callback(books);
	});
};

UpdateUrl.prototype.cron = function(){
	var d = Q.defer();
	var _updates = this._updates.bind(this);

	this.run(function(books){
		Q.all(books.map(_updates))
		.done(function(modifiedBooks){
			d.resolve(modifiedBooks);
		});
	});

	return d.promise;
};

module.exports = function(opts){
	var _opts = opts || {};

	_opts.conditions = {
		$and: [
		  { isKindlized: true },
		  { isKindlizedUrl: { $ne: true } },
			{
				$or: [
					{ "modifiedLog.UpdateUrlAt": { $exists: false } },
					{ "modifiedLog.UpdateUrlAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
				]
			}
		]
	};

	_opts.amazonConditions = {
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small, ItemAttributes'
	};

	return new UpdateUrl(_opts);
};
