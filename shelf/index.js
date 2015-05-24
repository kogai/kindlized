"use strict";

var Q = require('q');

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');

var fetchAuthor = require('shelf/lib/fetchAuthor');

var updateAuthorModifiedTime = require('shelf/lib/updateAuthorModifiedTime');
var fetchPageCount = require('shelf/lib/fetchPageCount');
var fetchBookList = require('shelf/lib/fetchBookList');
var modifyBookList = require('shelf/lib/modifyBookList');
var saveBookList = require('shelf/lib/saveBookList');

var handleAuthorData = function(author){
	var d = Q.defer();

	// シーケンシャルに処理する非同期処理
	Q.when(author)
	.then(updateAuthorModifiedTime)
	.then(fetchPageCount)
	.then(fetchBookList)
	.then(modifyBookList)
	.then(saveBookList)
	.then(function(author){
		log.info(author.name + ' : ' + author.pageCount + 'ページ分' + 'の処理を完了');
	})
	.fail(function(result){
		log.info(result.err);
		log.info(result.author.name + ' : ' + 'の処理が失敗');
	})
	.done(function() {
		d.resolve();
	});

	return d.promise;
};

module.exports = function(){
	fetchAuthor()
	.done(function(authors){
		if(authors.length === 0){
			return;
		}
		promiseSerialize(authors, handleAuthorData)
		.done(function(){
			return log.info('shelfの巡回処理が完了');
		});
	});
};
