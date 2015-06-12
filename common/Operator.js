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

/**
@constructor
@param { String } query - search query.
@param { String } type - type of search. Title or Author
**/
function Operator(opts){

	var _opts = opts || {};

	if((typeof _opts.query) !== 'string' || _opts.query === undefined){ throw new Error('query parameter required string.'); }
	if((typeof _opts.type) !== 'string' || _opts.type === undefined){ throw new Error('type parameter required string.'); }

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

	return this;
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
		ResponseGroup: 'Small, ItemAttributes, Images'
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
**/
Operator.prototype.search = function(callback){

	var _self = this;
	var _conditions = this._conditions();

	Operation.execute(this.operationType, _conditions, function(err, res){
		if(err){
			return callback(err);
		}

		if(res.ItemSearchErrorResponse){
			var errorCode = res.ItemSearchErrorResponse.Error[0].Code[0];

			switch(errorCode){
				case 'RequestThrottled':
					_self.retry++;
					setTimeout(function(){
						_self.search(callback);
					}, INTERVAL * _self.retry);
					break;
				case 'SignatureDoesNotMatch':
					callback(res.ItemSearchErrorResponse);
					break;
			}
			// エラーコードを記録しておく
			if(process.env.NODE_ENV === 'development'){
				return log.info(errorCode);
			}
			return log.warn.info(errorCode);
		}
		_self.retry = 0;
		callback(null, res.ItemSearchResponse.Items[0]);
	});
};


/**
@param { Function } callback
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
		callback(null);
	});
};


/**
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
Operator.prototype.fetch = function(done){
	var _self = this;

	if(!this.maxPage){
		throw new Error('this.maxPage required before Operator.fetch method call.');
	}

	// 完了時の処理
	if(this.currentPage > this.maxPage){
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
Operator.fetchをラップするメソッド
PAGING_LIMIT * 2 よりもページ数の多いリクエストは、発行年度を検索条件に含めてリクエストを分割する
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
Operator.prototype.fetchOverLimitTwice = function(done){

};

// Operator.prototype.prev = function(){};


/**
引数にコールバック関数を持つメソッドをPromiseオブジェクトでラップする
@param { Function } method - callback関数を引数に持つメソッド
@example
var _method = this.defer(this.method.bind(this));
_method().done(function(items){ console.log("done."); });
**/
Operator.prototype.defer = function(method){
	var d = Q.defer();

	method(function(err, res){
		if(err){
			return d.reject(err);
		}
		d.resolve(res);
	});

	return d.promise;
};

module.exports = function(opts){
	return new Operator(opts);
};
