"use strict";

var INTERVAL = require('common/constant').INTERVAL;
var PAGING_LIMIT = require('common/constant').PAGING_LIMIT;
var OPERATION_CONFIG = require('common/constant').OPERATION_CONFIG;

var OperationHelper = require('apac').OperationHelper;
var Operation = new OperationHelper(OPERATION_CONFIG);

var Q = require('q');
var util = require('util');
var _ = require('underscore');

var log = require('common/log');
var BookList = require('models/BookList');
var Author = require('models/Author');

/**
@constructor
@param { String } query - search query.
@param { String } type - type of search. Title or Author
**/
function Operator(opts){
	var _opts = opts || {};

	if((typeof _opts.query) !== 'string' || _opts.query === undefined){ throw new Error('[' + _opts.query + '] query parameter required string.'); }
	if((typeof _opts.type) !== 'string' || _opts.type === undefined){ throw new Error('[' + _opts.type + '] type parameter required string.'); }

	this.query = _opts.query;
	this.type = _opts.type;
	this.operationType = 'ItemSearch';
	this.retry = 0;
	this.currentPage = 1; //ItemPage
	this.maxPage = null;
	this.totalItems = 0;
	this.items = [];
	this.isOverLimit = false; // AmazonAPIの検索ページネーション上限は10P. 降順 <-> 昇順にソート順を切り替えて20Pまで呼び出す
	this.isOverLimitTwice = false;
	this.ResponseGroup = _opts.ResponseGroup || 'Small, ItemAttributes, Images';
}

/**
@param { String } type - 検索タイプ ex: Author, Title
@example 'Author'
@return { Object } _conditions AmazonAPIの検索条件. 署名付き. シングルトンだと署名がマッチしないので毎回生成する
**/
Operator.prototype._conditions = function(){

	var sortConditions = 'titlerank', currentPage = this.currentPage;
	if(this.isOverLimit){
		sortConditions = '-titlerank';
		currentPage -= PAGING_LIMIT;
	}

	var _conditions = {
		Sort: sortConditions,
		SearchIndex: 'Books',
		BrowseNode: 465392,
		Condition: 'New',
		ItemPage: currentPage,
		ResponseGroup: this.ResponseGroup
	};

	switch(this.type){
		case 'Author':
			_conditions.Author = this.query;
			break;

		case 'Title':
		_conditions.Title = this.query;
			break;
	}

	return _conditions;
};


/**
@param { Function } callback
@return { Number } totalItems
@return { Number } maxPage
**/
Operator.prototype.count = function(callback){
	var _self = this;
	this.search(function(err, items){
		if(err){
			return callback(err);
		}
		_self.totalItems = Number(items.TotalResults[0]); //@example 11冊
		_self.maxPage = Number(items.TotalPages[0]); //@example 2ページ(10冊 + 1冊)

		// Operator.isOverPagingLimitを超えるリクエストは発行年度を検索条件に含めてリクエストを分割する
		if(_self.maxPage >= PAGING_LIMIT * 2){
			_self.isOverLimitTwice = true;
		}

		// 検索結果がなかった場合の処理
		if(_self.maxPage === 0){
			return callback('Error: "' + _self.query + '" has not result.');
		}

		callback(null, {
			totalItems: _self.totalItems,
			maxPage: _self.maxPage
		});
	});
};


/**
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/

Operator.prototype.fetch = function(done){
	var _self = this;

	if(!this.maxPage){
		throw new Error('Operator.maxPage required before Operator.fetch method call.');
	}

	// 完了時の処理
	if(this.currentPage === this.maxPage || this.currentPage > PAGING_LIMIT * 2){
		this.maxPage = null;
		this.currentPage = 1;
		this.items = _.uniq(this.items, function(item){
			return item.ASIN[0];
		});

		return done(null, this.items);
	}

	this.search(function(err, searchedItems){
		if(err){
			return done(err);
		}
		_self.currentPage++;

		// AmazonAPIのページング上限を超えたら
		// ソート順を逆にする
		if(_self.currentPage > PAGING_LIMIT){
			_self.isOverLimit = true;
		}

		_self.items = _self.items.concat(searchedItems.Item);
		_self.fetch(done);
	});

};


/**
Operator.query, Operator.currentPage を検索する
@param { Function } done
**/
Operator.prototype.search = function(done){
	var _self = this;
	var _conditions = this._conditions();

	Operation.execute(this.operationType, _conditions, function(err, res){
		if(err){
			return done(err);
		}

		if(res.ItemSearchErrorResponse){
			var errorCode = res.ItemSearchErrorResponse.Error[0].Code[0];

			switch(errorCode){
				case 'RequestThrottled':
					_self.retry++;
					setTimeout(function(){
						_self.search(done);
					}, INTERVAL * _self.retry);
					break;
				case 'SignatureDoesNotMatch':
					done(res.ItemSearchErrorResponse);
					break;
			}
			// エラーコードを記録しておく
			if(process.env.NODE_ENV === 'development'){
				return log.info(INTERVAL * _self.retry + ":" + errorCode + ':' + _conditions.Author + ':' + _conditions.ItemPage);
			}
			return log.warn.info(errorCode);
		}

		_self.retry = 0;
		done(null, res.ItemSearchResponse.Items[0]);
	});
};


/**
[WIP] Operator.fetchをラップするメソッド
PAGING_LIMIT * 2 よりもページ数の多いリクエストは、発行年度を検索条件に含めてリクエストを分割する
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
Operator.prototype.fetchOverLimit = function(done){
	throw new Error('this method is work in progress.');
	/*
	if(!this.isOverLimitTwice){
		throw new Error('Operator.isOverLimitTwice required Operator.isOverLimitTwice');
	}
	done(null, []);
	*/
};

/**
@param  { Array } books - AmazonAPIから取得した生の書籍データ配列
@return  { Array } DB保存用に正規化された書籍データの配列
**/
Operator.prototype._normalize = function(books){
	if(!util.isArray(books)) {
		throw new Error('Operator._normalize required array');
	}

	return books.map(function(book){
		var itemAttr = book.ItemAttributes[0], itemImageSets, isKindlized, isKindlizedUrl;

		var normalizedBook = {
			ASIN: book.ASIN,
			ISBN: book.ISBN,
			SKU: book.SKU,
			EAN: itemAttr.EAN,
			author: itemAttr.Author || ["HAS_NOT_AUTHOR"],
			title: itemAttr.Title,
			publisher: itemAttr.Publisher,
			publicationDate: itemAttr.PublicationDate,
			price: itemAttr.ListPrice,
			url: book.DetailPageURL
		};

		if(book.ImageSets){
			itemImageSets = JSON.stringify(book.ImageSets);
		}

		if(itemAttr.ProductGroup[0] === 'eBooks'){
			isKindlized = true;
			isKindlizedUrl = true;
		}
		normalizedBook.images = itemImageSets;
		normalizedBook.isKindlized = isKindlized;
		normalizedBook.isKindlizedUrl = isKindlizedUrl;

		return normalizedBook;
	});
};


/**
引数にコールバック関数を持つメソッドをPromiseオブジェクトを返す関数でラップする
@param { Function } method - callback関数を引数に持つメソッド
@example
var _method = this.defer(this.method.bind(this));
_method().done(function(items){ console.log(items, "done."); });
**/
Operator.prototype.defer = function(method){
	return function(){
		var d = Q.defer();

		method(function(err, res){
			if(err){
				return d.reject(err);
			}
			d.resolve(res);
		});

		return d.promise;
	};
};

/**
ハンドラー
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
Operator.prototype.run = function(done){
	var _self = this;

	var _count = this.defer(this.count.bind(this));
	var _fetch = this.defer(this.fetch.bind(this));

	Q.when()
	.then(_count)
	.then(_fetch)
	.then(function(items){
		if(_self.type === 'Title'){
			return done(null, _self._normalize(items));
		}
		done(null, items);
	})
	.fail(function(err){
		done(err, null);
	});
};

module.exports = function(opts){
	return new Operator(opts);
};
