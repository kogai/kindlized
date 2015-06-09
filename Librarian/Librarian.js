"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var BookList = require('models/BookList');
var LIMIT = require('common/constant').LIMIT.BOOK;

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');
var itemLookUp = require('common/itemLookUp');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

function Librarian(opts){
	this.books = [];
	this.limit = LIMIT;
	this.conditions = opts.conditions;
	this.sort = opts.sort;
}

/*
	調査対象の書籍をDBから取得
	@ param callback | 非同期処理完了後に呼ばれるコールバック関数
	@ return err
	@ return books
*/
Librarian.prototype.fetch = function(callback){
	var query = BookList.find(this.conditions).limit(this.limit);
	if(this.sort){
		query = query.sort(this.sort);
	}

	query.exec(function(err, books) {
		if(err){
			return callback(err);
		}
		callback(null, books);
	});
};

/*
	調査対象の書籍のシークエンシャル処理
	@ param books
	@ return none
*/
Librarian.prototype.sequential = function(books){
	var d = Q.defer();
	var _inspect = this._inspect.bind(this);

	promiseSerialize(books, _inspect)
	.done(function(books){
		d.resolve(books);
	});

	return d.promise;
};


/*
	調査対象の書籍についてAmazonAPIを呼び出し
	@param book Object
	@return book Object
*/
Librarian.prototype.inspect = function(book){
	var d = Q.defer();

	var _self = this;
	var update = {
		"modifiedLog.InspectKindlizeAt": moment()
	};
	var conditions = {
    ItemId: book.AuthorityASIN[0],
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small'
	};

	var success = function(res){
		var relatedItem = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;
		var hasEbook = _self._hasEbook(relatedItem)[0];

		if(hasEbook){
			update.isKindlized = true;
			book.ebookASIN = _self._hasEbook(relatedItem)[1];
		}

		book.err = null;
		book.relatedItem = relatedItem;
		book.hasEbook = hasEbook;
		book.update = update;

		_self._update(book);
		return book;
	};

	var fail = function(err){
		book.err = err;
		book.relatedItem = null;
		book.hasEbook = false;
		book.update = update;

		_self._update(book);
		return book;
	};

	itemLookUp(conditions, success, fail)
	.done(function(book){
		d.resolve(book);
	});

	return d.promise;
};

/*
	ハンドラー
*/
Librarian.prototype.run = function(callback){
	callback();
	/*
	var _fetch = this._fetch.bind(this);
	var _sequential = this._sequential.bind(this);

	Q.when()
	.then(_fetch)
	.then(_sequential)
	.done(function(books){
		callback();
	});
	*/
};

Librarian.prototype.cron = function(){
	var d = Q.defer();

	this.run(function(){
		d.resolve();
	});

	return d.promise;
};

module.exports = function(){
	return new Librarian();
};
