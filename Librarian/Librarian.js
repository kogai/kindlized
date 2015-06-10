"use strict";

var Q = require('q');
var moment = require('moment-timezone');
var objectAssign = require('object-assign');

var LIMIT = require('common/constant').LIMIT.BOOK;

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');
var itemLookUp = require('common/itemLookUp');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

/**
	@constructor
	@classdesc 	Librarianサービスで使用する処理をまとめたスーパークラス<br/>DBの定期処理群はこのクラスを継承して作成する
	@param { Number } [limit=500] - fetchメソッドの取得数上限
	@param { Object } [conditions={ isKindlized: true }] - fetchメソッドの検索条件
	@param { Object } [sort] - fetchメソッドのソート条件
	@param { Object } [amazonConditions={ ResponseGroup: 'RelatedItems, Small' }] - inspectメソッドの検索条件
**/
function Librarian(opts){
	var _opts = opts || {};

	this.limit = _opts.limit || LIMIT;
	this.conditions = _opts.conditions || { isKindlized: true };
	this.sort = _opts.sort;
	this.Model = _opts.Model || require('models/BookList');
	this.amazonConditions = _opts.amazonConditions || { ResponseGroup: 'Small , ItemAttributes , Images' };
	if(!this.Model) { throw new Error('モデルは必須項目'); }
	if(!this.limit) { throw new Error('実行数の上限は必須項目'); }
	if(!this.conditions) { throw new Error('DBの検索条件は必須項目'); }
	if(!this.amazonConditions) { throw new Error('APIの検索条件は必須項目'); }
}

/**
	調査対象の書籍をDBから取得
	@param { Function } callback - 非同期処理完了後に呼ばれるコールバック関数
	@return { Error } err 第一引数はエラーオブジェクト
	@return { Array } books this.conditionsによるクエリ結果を返す
**/
Librarian.prototype.fetch = function(callback){
	var query = this.Model.find(this.conditions).limit(this.limit);
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

/**
	調査対象の書籍の順次処理
	@param { Object } books - 各要素に順次にinspectメソッドを実行される配列
	@param { Function } callback - 全配列にinspectメソッドが実行された後に呼ばれるコールバック関数
	@return { Array } modifiedBooks inspectメソッドの返り値が格納された配列
**/
Librarian.prototype.sequential = function(books, callback){
	var _lookup = this.lookup.bind(this);

	promiseSerialize(books, _lookup)
	.done(function(modifiedBooks){
		callback(null, modifiedBooks.resultArray);
	});
};


/**
	調査対象の書籍についてAmazonAPIを呼び出す
	@param { Object } book - DBから呼び出した1つの書籍データ
	@param { Function } callback - lookupメソッドが実行された後に呼ばれるコールバック関数
	@return { Object } modifiedBook AmazonAPIのレスポンスをメンバに格納したbookオブジェクト
**/
Librarian.prototype.lookup = function(book){
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

	var conditions = objectAssign({}, this.amazonConditions, book.conditions || { ItemId: book.ASIN[0] });

	itemLookUp(conditions, success, fail)
	.done(function(modifiedBook){
		d.resolve(modifiedBook);
	});

	return d.promise;
};

/**
	書籍の更新
	@param { Objcet } book - 書籍データ
	@param { Objcet } update - 更新する要素
	@param { Function } callback - 処理完了後に呼ばれるコールバック関数
	@return { Error } err
	@return { Object } modifiedBook 更新後の書籍データ
**/
Librarian.prototype.update = function(book, update, callback){
	var conditions = {
		ASIN: book.ASIN[0]
	};

	this.Model.findOneAndUpdate(conditions, update, function(err, modifiedBook){
		if(err){
			return callback(err);
		}
		callback(null, modifiedBook);
	});
};

Librarian.prototype.defer = function(method){
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


/**
	ハンドラー
	fetch -> sequential[loocup] の順に実行するメソッド
	@param { Function } callback - 処理完了後に呼ばれるコールバック関数
	@return { Array } books sequentialメソッドの返り値
**/
Librarian.prototype.run = function(callback){
	var _fetch = this.fetch.bind(this);
	var _sequential = this.sequential.bind(this);

	Q.when()
	.then(function(){
		var d = Q.defer();

		_fetch(function(err, books){
			d.resolve(books);
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
	.done(function(books){
		callback(books);
	});
};

/**
	呼び出し先で順次処理するためのハンドラー
**/
Librarian.prototype.cron = function(){
	var d = Q.defer();

	this.run(function(){
		d.resolve();
	});

	return d.promise;
};

module.exports = Librarian;
