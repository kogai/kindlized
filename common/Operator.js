"use strict";

var INTERVAL = require('common/constant').INTERVAL;
var OPERATION_CONFIG = require('common/constant').OPERATION_CONFIG;
var OperationHelper = require('apac').OperationHelper;
var Operation = new OperationHelper(OPERATION_CONFIG);

var Q = require('q');
var util = require('util');

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
	this.maxPage = 0;
	this.totalItems = 0;
	this.items = [];

	return this;
}

/**
@param { String } type - 検索タイプ ex: Author, Title
@example 'Author'
@return { Object } _conditions AmazonAPIの検索条件. 署名付き. シングルトンだと署名がマッチしないので毎回生成する
**/
Operator.prototype._conditions = function(){

	var _conditions = {
		SearchIndex: 'Books',
		BrowseNode: 465392,
		Condition: 'New',
		ItemPage: this.currentPage,
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


Operator.prototype.count = function(callback){
	var _self = this;
	this.search(function(err, items){
		if(err){
			log.info(err);
			return callback(err);
		}
		_self.totalItems = items.TotalResults; //11冊
		_self.maxPage = items.TotalPages; //2ページ
		callback(null);
	});
};


/**
@param { Function } done - ページング完了時に呼ばれるコールバック関数
**/
Operator.prototype.next = function(done){
	var _self = this;

	// 完了時の処理
	if(this.currentPage > this.maxPage){
		this.currentPage = 1;
		return done();
	}

	this.search(function(err, items){
		if(err){
			return log.info(err);
		}
		_self.currentPage++;
		_self.items = _self.items.concat(items.Item);
		_self.next(done);
	});

	/*
	var _self = this;
	var _count = this.defer(this.count.bind(this));
	_count()
	.fail(function(err){
		log.info(err);
		return done();
	})
	.done(function(items){
	});
	*/

	/*
	this.search(function(err, items){
		if(err){
			return log.info(err);
		}
	});
	*/
};

// Operator.prototype.prev = function(){};

/**
@param { Function } method - callback関数を引数に持つメソッド
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

// this.Title = newBook;
// this.Author = Author;
