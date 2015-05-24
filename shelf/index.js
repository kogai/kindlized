"use strict";

var Q = require('q');

var log = require('common/log');
var promiseSerialize = require('common/promiseSerialize');

var fetchAuthor = require('shelf/lib/fetchAuthor');
var updateAuthorModifiedTime = require('shelf/lib/updateAuthorModifiedTime');

var handleAuthorData = function(author){
	var d = Q.defer();

	// シーケンシャルに処理する非同期処理
	Q.when(author)
	.then(updateAuthorModifiedTime)
	// .then(fetchPageCounts)
	// .then(fetchBookList)
	// .then(modifyBookList)
	// .then(saveBookList)
	.done(function(author) {
		log.info(author.name + ' : ' + '著者毎の処理を完了');
		// log.info(author.name + '/' + authorData.bookList.length + '冊' + '著者毎の処理を完了');
		d.resolve();
	});

	return d.promise;
};

fetchAuthor()
// .done(function(authors){
// 	if(authors.length === 0){
// 		return;
// 	}
// 	promiseSerialize(authors, handleAuthorData)
// 	.done(function(){
// 		log.info('shelf処理が完了');
// 	});
// });

// var fs = require('fs');
//
// var regInt = require('shelf/lib/regInt');
// var fetchAuthor = require('shelf/lib/fetchAuthor');
// var fetchPageCounts = require('shelf/lib/fetchPageCounts');
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
