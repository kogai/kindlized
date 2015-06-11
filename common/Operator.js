"use strict";

var INTERVAL = require('common/constant').INTERVAL;
var OPERATION_CONFIG = require('common/constant').OPERATION_CONFIG;
var OperationHelper = require('apac').OperationHelper;
var Operation = new OperationHelper(OPERATION_CONFIG);

var util = require('util');
var log = require('common/log');

/**
@constructor
**/
function Operator(opts){

	// var _opts = opts || {};
	// ItemPage: page || 1
	this.operationType = 'ItemSearch';
	this.count = 0;

	return this;
}

/**
@param { String } type - 検索タイプ ex: author, title
@return { Object } _conditions AmazonAPIの検索条件. 署名付き. シングルトンは署名がマッチしないので毎回生成する
**/
Operator.prototype._conditions = function(query, type){
	if((typeof query) !== 'string' || query === undefined){ throw new Error('query parameter required string.'); }
	if((typeof type) !== 'string' || type === undefined){ throw new Error('type parameter required string.'); }

	var _conditions = {
		SearchIndex: 'Books',
		BrowseNode: 465392,
		Condition: 'New',
		ResponseGroup: 'Small, ItemAttributes, Images'
	};

	switch(type){
		case 'Author':
			_conditions.Author = query;
			break;

		case 'Title':
		_conditions.Title = query;
			break;
	}

	return _conditions;
};

/**
@param { String } query - search query.
@param { String } type - type of search. Title or Author
@param { Function } callback
**/
Operator.prototype.search = function(query, type, callback){

	var _self = this;
	var _conditions = this._conditions(query, type);

	Operation.execute(this.operationType, _conditions, function(err, res){
		if(err){
			return callback(err);
		}

		if(res.ItemSearchErrorResponse){
			var errorCode = res.ItemSearchErrorResponse.Error[0].Code[0];

			switch(errorCode){
				case 'RequestThrottled':
					_self.count++;
					setTimeout(function(){
						_self.search(query, type, callback);
					}, INTERVAL * _self.count);
					break;
				case 'SignatureDoesNotMatch':
					callback(res.ItemSearchErrorResponse);
					break;
			}
			// エラーコードを記録しておく
			return log.info(errorCode);
		}
		_self.count = 0;
		callback(null, res.ItemSearchResponse.Items);
	});
};

/*
Operator.prototype.count = function(){

};

Operator.prototype.next = function(){

};

Operator.prototype.prev = function(){

};

Operator.prototype.lookup = function(){

};
*/

module.exports = function(opts){
	return new Operator(opts);
};

// this.Title = newBook;
// this.Author = Author;
