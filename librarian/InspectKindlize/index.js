"use strict";

var Q = require('q');
var moment = require('moment-timezone');

var limit = require('common/constant').limit;
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

	var query = modelBookList.find({
			AuthorityASIN: /.+/,
			isKindlized: false,
			$or: [
        {
					lastModified: {
						$lte: moment().subtract(periodicalDay, 'days')
					}
				}, {
					lastModified: {
						$exists: false
					}
				}

			]
		})
		.limit(limit);

	query.exec(function(error, haveAuthorityAsin) {
		console.log('Kindle化されていない' + haveAuthorityAsin.length + '冊の書籍');
		d.resolve(haveAuthorityAsin);
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
