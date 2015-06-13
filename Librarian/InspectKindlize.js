"use strict";

var Q = require('q');
var moment = require('moment-timezone');
var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:' + 5000, { reconnect: true });

var BookList = require('models/BookList');
var LIMIT = require('common/constant').LIMIT.BOOK;

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');
var itemLookUp = require('common/itemLookUp');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

function InspectKindlize(_opts){
	this.limit = _opts.limit || LIMIT;
	this.books = [];
}

/*
	調査対象の書籍をDBから取得
	@ return books
*/
InspectKindlize.prototype._fetch = function(){
	var d = Q.defer();
	var _self = this;

	var conditions = {
		$and: [
			{ AuthorityASIN: { $exists: true } },
			{ AuthorityASIN: { $ne: [''] } },
			{ AuthorityASIN: { $ne: null } },
			{ isKindlized: false },
			{
				$or: [
					{ "modifiedLog.InspectKindlizeAt": { $exists: false } },
					{ "modifiedLog.InspectKindlizeAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
				]
			}
		]
	};

	var query = BookList.find(conditions).limit(this.limit).sort({
		"modifiedLog.InspectKindlizeAt": 1
	});

	query.exec(function(err, books) {
		if(err){
			log.info(err);
			return d.reject(err);
		}
		log.info(moment().format('YYYY-MM-DD hh:mm') + ":" + books.length + "冊の書籍がkindle化されているか調査");
		_self.books = books;
		d.resolve(books);
	});

	return d.promise;
};

/**
調査対象の書籍のシークエンシャル処理
@param books
@return none
**/
InspectKindlize.prototype._sequential = function(books){
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
InspectKindlize.prototype._inspect = function(book){
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

InspectKindlize.prototype._hasEbook = function(relatedItem){
	var hasEbook = false, ebookASIN = null;
	relatedItem.forEach(function(item) {
		var relatedBook = item.Item[0].ItemAttributes[0];
		if (relatedBook.ProductGroup[0] === 'eBooks') {
			hasEbook = true;
			ebookASIN = item.Item[0].ASIN;
		}
	});
	return [hasEbook, ebookASIN];
};

InspectKindlize.prototype._update = function(book){
	var conditions = {
		ASIN: book.ASIN
	};
	var update = book.update;

	var conditionsAPI = {
		ItemId: book.ebookASIN,
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'Small'
	};

	var success = function(res){
    var ebookUrl = res.ItemLookupResponse.Items[0].Item[0].DetailPageURL[0];
		update.isKindlizedUrl = true;
		return ebookUrl;
	};

	var fail = function(err){
		log.info(err);
		return book.url;
	};

	// ログ文言を調整
	var msg = '電子版無し';
	if(book.hasEbook){
		msg = '電子版有り';
	}

	// 更新処理
	var updater = function(){
		BookList.findOneAndUpdate(conditions, update, { upsert: true }, function(err, savedBook){
			if(err){
				return log.info(err);
			}
			log.info(msg + ":" + savedBook.modifiedLog.InspectKindlizeAt + ":" + savedBook.title);
		});
	};

	if(book.hasEbook){
		itemLookUp(conditionsAPI, success, fail)
		.done(function(url){
			update.url = url;
			book.url = url;
			updater();
  		socket.emit('librarian-kindlized', book);
		});
		return ;
	}
	updater();
};

InspectKindlize.prototype.listen = function(){
	socket.on('connect', function(){
		log.info('Twitter-Botへの通知クライアントを起動');
	});
};

/*
	ハンドラー
*/
InspectKindlize.prototype.run = function(callback){
	var _fetch = this._fetch.bind(this);
	var _sequential = this._sequential.bind(this);

	Q.when()
	.then(_fetch)
	.then(_sequential)
	.done(function(books){
		callback();
	});
};

InspectKindlize.prototype.cron = function(){
	var d = Q.defer();

	this.run(function(){
		d.resolve();
	});

	return d.promise;
};

module.exports = function(opts){
	var _opts = opts || {};
	return new InspectKindlize(_opts);
};
