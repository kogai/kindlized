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
**/
function UpdateUrl(opts){
	Librarian.call(this, opts);
}

util.inherits(UpdateUrl, Librarian);

/**

**/
UpdateUrl.prototype.sequential = function(books, callback){
	var _lookup = this.lookup.bind(this);
	var conditinalizeBooks = this._addConditions(books);

	promiseSerialize(conditinalizeBooks, _lookup)
	.done(function(modifiedBooks){
		callback(null, modifiedBooks.resultArray);
	});
};

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

	// var update = {};
	// var images;
	/*
	try{
		images = book.res.ItemLookupResponse.Items[0].Item[0].ImageSets;
		images = JSON.stringify(images);
		log.info('images更新:' + book.title);
	}catch(e){
		images = "";
		log.info('images未更新:' + book.title);
		log.info(util.inspect(book.res.ItemLookupResponse, null, null));
	}
	update.images = images;

	this.update(book, update, function(err, modifiedBook){
		if(err){
			return d.reject(err);
		}
		d.resolve(modifiedBook);
	});
	*/

	return d.promise;
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
			{ "modifiedLog.UpdateUrlAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
		]
	};

	_opts.amazonConditions = {
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small'
	};

	return new UpdateUrl(_opts);
};
