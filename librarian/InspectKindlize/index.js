"use strict";

var Q = require('q');
var moment = require('moment-timezone');
var io = require('socket.io-client');
var socket = io.connect('http://127.0.0.1:' + 5000, { reconnect: true });

var BookList = require('models/BookList');
var LIMIT = require('common/constant').LIMIT.BOOK;
LIMIT = 10;
var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');
var itemLookUp = require('common/itemLookUp');
var current = moment();
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

function InspectKindlize(){
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
		AuthorityASIN: {
			$exists: true
		},
		isKindlized: false,
		lastModified: {
			$lte: moment("2015-06-05")
		}
		/*
		"modifiedLog.InspectKindlizeAt": {
			// "$lte": moment("2015-06-05")
			// "$lte": current.subtract(PERIODICAL_DAY, 'days').format('YYYY-MM-DD hh:mm')
		}
		*/
	};

	var query = BookList.find(conditions).limit(LIMIT);

	query.exec(function(err, books) {
		if(err){
			log.info(err);
			return d.reject(err);
		}

		log.info(current.format('YYYY-MM-DD hh:mm') + ":" + books.length + "冊の書籍がkindle化されているか調査");
		_self.books = books;
		d.resolve(books);
	});

	return d.promise;
};

/*
	調査対象の書籍のシークエンシャル処理
	@ param books
	@ return none
*/
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
		"modifiedLog.InspectKindlizeAt": current
	};
	var conditions = {
    ItemId: book.AuthorityASIN[0],
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small'
	};

	var success = function(res){
		var relatedItem = res.ItemLookupResponse.Items[0].Item[0].RelatedItems[0].RelatedItem;
		var hasEbook = _self._hasEbook(relatedItem);

		if(hasEbook){
			update.isKindlized = true;
    	socket.emit('librarian-kindlized', book);
		}

		book.err = null;
		book.relatedItem = relatedItem;
		book.hasEbook = hasEbook;
		book.update = update;

		log.info(book.hasEbook);
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
	var hasEbook = false;
	relatedItem.forEach(function(item) {
		var relatedBook = item.Item[0].ItemAttributes[0];
		if (relatedBook.ProductGroup[0] === 'eBooks') {
			hasEbook = true;
		}
	});
	return hasEbook;
};

InspectKindlize.prototype._update = function(book){
	var conditions = {
		AuthorityASIN: book.AuthorityASIN
	};
	var update = book.update;

	var msg;
	if(book.hasEbook){
		msg = '電子版有り';
	}else{
		msg = '電子版無し';
	}

	BookList.findOneAndUpdate(conditions, update, function(err, book){
		if(err){
			return log.info(err);
		}
		log.info(msg + ":" + book.modifiedLog.InspectKindlizeAt + ":" + book.title);
	});
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

module.exports = new InspectKindlize();
