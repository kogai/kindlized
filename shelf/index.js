"use strict";

var Q = require('q');

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');

var fetchAuthor = require('shelf/lib/fetchAuthor');
var updateAuthorModifiedTime = require('shelf/lib/updateAuthorModifiedTime');
var fetchPageCount = require('shelf/lib/fetchPageCount');

var handleAuthorData = function(author){
	var d = Q.defer();

	// シーケンシャルに処理する非同期処理
	Q.when(author)
	.then(updateAuthorModifiedTime)
	.then(fetchPageCount)
	// .then(fetchBookList)
	// .then(modifyBookList)
	// .then(saveBookList)
	.then(function(author){
		log.info(author.name + ' : ' + author.pageCount + '冊' + 'の処理を完了');
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

fetchAuthor()
.done(function(authors){
	if(authors.length === 0){
		return;
	}
	promiseSerialize(authors, handleAuthorData)
	.done(function(){
		log.info('shelf処理が完了');
	});
});

// var fs = require('fs');
//
// var regInt = require('shelf/lib/regInt');
// var fetchAuthor = require('shelf/lib/fetchAuthor');
// var fetchBookList = require('shelf/lib/fetchBookList');
// var modifyBookList = require('shelf/lib/modifyBookList');
// var saveBookList = require('shelf/lib/saveBookList');
// var constant = require('shelf/lib/constant');
// var log = require('common/log');
//
// var authorRecursionCount = 0;
//
// module.exports = function() {
// 	var defered = Q.defer();
// 	Q.when()
// 		.then(fetchAuthor)
// 		.done(function(authorList) {
// 			if (authorList.length === 0) {
// 				defered.resolve();
// 			}
// 			var data = {
// 				times: authorList.length,
// 				interval: constant.interval,
// 				obj: {},
// 				callBack: function(data) {
// 					var authorData = {
// 						author: authorList[data.countExec],
// 						defered: defered,
// 						authorList: authorList,
// 						authorRecursionCount: authorRecursionCount,
// 					};
//
// 					log.info('\n------------------------\n' + authorData.author + 'の処理を開始');
// 				}
// 			};
// 			regInt(data);
// 		});
// 	return defered.promise;
// };
