var Q = require('q');
var _ = require('underscore');
var moment = require('moment-timezone');
var modelAuthor = require('models/Author');;
var modleUser = require('user/');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

var fetchNewId = function(user){
	'use strict';
	var def = Q.defer();

	var query = {
		$and: [
			{
				_id: {
					$in: user.authorList
				}
			},
			// {
			// 	isChanged: true
			// }
		]
	};

	modelAuthor.find(query, function (err, authors) {
		if(err){
			def.reject(err);
		}
		var newPublishedBooks = authors.map(function (author) {
			var recentBooks = author.wroteBooks.recent.publicationBooks;
			var currentBooks = author.wroteBooks.current.publicationBooks;
			return _.difference(recentBooks, currentBooks);
		});
		newPublishedBooks = _.flatten(newPublishedBooks);
		newPublishedBooks = newPublishedBooks.map( function(bookId) {
			return {
        isNotified: false,
        bookId: bookId
			};
		});
		user.newPublishedBooks = newPublishedBooks;
		def.resolve(user);
	});

	return def.promise;
};

var saveNewId = function (user) {
	'use strict';
	var def = Q.defer();

	modleUser.find({ _id: user._id }, function () {
		def.resolve(user);
	});

	return def.promise;
};

module.exports = function (user) {
	'use strict';
	var d = Q.defer();

	Q.when(user)
		.then(fetchNewId)
		.then(saveNewId)
		.done(function (user) {
			d.resolve(user);
		});
	return d.promise;
};

/*
##推薦する書籍リストを作る
1. authorListの_idからauthorモデルのwroteBooks配列の書籍リストを{isChanged:true}クエリで呼び出す
2. 呼び出された書籍リストのrecent-currentのpublicationBooks配列を比較して、currentの側にのみある_id要素を取得する
2. 呼び出し結果を_idをreccomendBookList対してユニークか検査する
3. フィルタリングされた_idリストをreccomendBookListにconcatして保存する
*/
