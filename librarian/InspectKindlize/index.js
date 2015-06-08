"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var BookList = require('models/BookList');
var LIMIT = require('common/constant').LIMIT.BOOK;
var log = require('common/log');

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

	var queryExec = {
		AuthorityASIN: {
			$exists: true
		},
		isKindlized: false
	};

	queryExec.modifiedLog = {
		InspectKindlizeAt: {
			$lte: moment().subtract(PERIODICAL_DAY, 'days')
		}
	};

	var query = BookList.find(queryExec).limit(LIMIT);

	query.exec(function(err, books) {
		if(err){
			log.info(err);
			return d.reject(err);
		}
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

	setTimeout(function(){
		log.info("sequential", books);
		d.resolve();
	}, 500);
	return d.promise;
};


/*
	調査対象の書籍についてAmazonAPIを呼び出し
	@param AuthorityASIN
	@param callback
	@return none
*/
InspectKindlize.prototype.inspect = function(AuthorityASIN, callback){
	log.info("inspect");
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
