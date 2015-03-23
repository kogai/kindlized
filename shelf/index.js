var Q = require('q');
var fs = require('fs');

var regInt = require('shelf/lib/regInt');
var fetchAuthor = require('shelf/lib/fetchAuthor');
var inspectAuthor = require('shelf/lib/inspectAuthor');
var fetchPageCounts = require('shelf/lib/fetchPageCounts');
var fetchBookList = require('shelf/lib/fetchBookList');
var modifyBookList = require('shelf/lib/modifyBookList');
var saveBookList = require('shelf/lib/saveBookList');
var constant = require('shelf/lib/constant');
var log = require('common/log');

var authorRecursionCount = 0;

module.exports = function() {
	var defered = Q.defer();
	Q.when()
		.then(fetchAuthor)
		.done(function(authorList) {
			if (authorList.length === 0) {
				defered.resolve();
			}
			var data = {
				times: authorList.length,
				interval: constant.interval,
				obj: {},
				callBack: function(data) {
					var authorData = {
						author: authorList[data.countExec],
						defered: defered,
						authorList: authorList,
						authorRecursionCount: authorRecursionCount,
					};

					log.info('\n------------------------\n' + authorData.author + 'の処理を開始');
					Q.when(authorData)
						.then(inspectAuthor)
						.then(fetchPageCounts)
						.then(fetchBookList)
						.then(modifyBookList)
						.then(saveBookList)
						.done(function(authorData) {
							log.info(authorData.author + '/' + authorData.bookList.length + '冊' + '著者毎の処理を完了' + '\n------------------------\n');

							data.countExec++;
							data.regularInterval(data);

							if (data.countExec === authorData.authorList.length - 1) {
								log.info('shelf処理が完了');
								defered.resolve();
							}

						});
				}
			};
			regInt(data);
		});
	return defered.promise;
};
