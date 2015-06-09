"use strict";

/*
	Librarianサービスで使用する処理をまとめたスーパークラス
	各処理群はこのクラスを継承して作成する
*/

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
	this.amazonConditions = opts.amazonConditions;

/*
	var conditions = {
    ItemId: book.AuthorityASIN[0],
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems, Small'
	};
*/
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
	調査対象の書籍の順次処理
	@ param books 各要素に順次にinspectメソッドを実行される配列
	@ param callback 全配列にinspectメソッドが実行された後に呼ばれるコールバック関数
	@ return modifiedBooks inspectメソッドの返り値が格納された配列
*/
Librarian.prototype.sequential = function(books, callback){
	var _inspect = this.inspect.bind(this);

	promiseSerialize(books, _inspect)
	.done(function(modifiedBooks){
		callback(modifiedBooks);
	});
};


/*
	調査対象の書籍についてAmazonAPIを呼び出し
	@param book Object |
	@param callback | lookupメソッドが実行された後に呼ばれるコールバック関数
	@return modifiedBook Object | AmazonAPIのレスポンスをメンバに格納したbookオブジェクト
*/
Librarian.prototype.lookup = function(book, callback){
	var d = Q.defer();

	var success = function(res){
		book.err = null;
		book.res = res;
		return book;
	};

	var fail = function(err){
		book.err = err;
		book.res = null;
		return book;
	};

	itemLookUp(this.amazonConditions, success, fail)
	.done(function(modifiedBook){
		callback(modifiedBook);
	});

	return d.promise;
};

Librarian.prototype.defer = function(method, opts){
	var d = Q.defer();

	method.bind(this);
	method(function(err, res){
		if(err){
			return d.reject(err);
		}
		d.resolve(res);
	});

	return d.promise;
};

/*
	ハンドラー
	fetch -> sequential[loocup] の順に実行するメソッド
	@param callback | 処理完了後に呼ばれるコールバック関数
	@return books | sequentialメソッドの返り値
*/
Librarian.prototype.run = function(callback){
	var _fetch = this.defer(this.fetch);
	var _sequential = this.defer(this.sequential);

	Q.when()
	.then(_fetch)
	.then(_sequential)
	.done(function(books){
		callback(books);
	});
};

/*
	他のクラスと順次処理するためのハンドラー
*/
Librarian.prototype.cron = function(){
	var d = Q.defer();

	this.run(function(){
		d.resolve();
	});

	return d.promise;
};

module.exports = Librarian;
