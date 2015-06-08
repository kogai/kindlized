"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var BookList = require('models/BookList');
var LIMIT = require('common/constant').LIMIT.BOOK;
var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');

var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

function InspectKindlize(){
	return this;
}

/*
	調査対象の書籍をDBから取得
	@ return books
*/
InspectKindlize.prototype.fetch = function(){
	var d = Q.defer();

	var conditions = {
		AuthorityASIN: {
			$exists: true
		},
		isKindlized: false,
		"modifiedLog.InspectKindlizeAt": {
			$lte: moment().subtract(PERIODICAL_DAY, 'days')
		}
	};

	var query = BookList.find(conditions).limit(LIMIT);

	query.exec(function(err, books) {
		if(err){
			log.info(err);
			return d.reject(err);
		}
		log.info(books.length);
		d.resolve(books);
	});

	return d.promise;
};

/*
	調査対象の書籍のシークエンシャル処理
	@ param books
	@ return none
*/
InspectKindlize.prototype.sequential = function(books){
	var d = Q.defer();

	promiseSerialize(books, this.inspect)
	.done(function(books){
		d.resolve(books);
	});

	return d.promise;
};


/*
	調査対象の書籍についてAmazonAPIを呼び出し
	@param AuthorityASIN
	@return none
*/
InspectKindlize.prototype.inspect = function(AuthorityASIN){
	var d = Q.defer();
	log.info("inspect");
	return d.promise;
};

/*
	ハンドラー
*/
InspectKindlize.prototype.run = function(callback){
	Q.when()
	.then(this.fetch)
	.then(this.sequential)
	.done(function(){
		callback();
	});
};

module.exports = new InspectKindlize();
