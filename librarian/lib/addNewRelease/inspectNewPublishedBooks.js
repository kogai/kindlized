var Q = require('q');
var _ = require('underscore');
var moment = require('moment-timezone');
var modelAuthor = require('author/lib/modelAuthor');
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

module.exports = function (user) {
	'use strict';
	var d = Q.defer();

	var query = {
		$and: [
			{
				_id: {
					$in: user.authorList
				}
			},
			{
				isChanged: true
			}
		]
	};

	modelAuthor.find(query, function (err, authors) {
		if(err){
			d.reject(err);
		}
		var newPublishedBooks = authors.map(function (author) {
			var recentBooks = author.recent.publicationBooks;
			var currentBooks = author.current.publicationBooks;
			return _.difference(recentBooks, currentBooks);
		});

		// user.postList = user.postList.concat(newPublishedBooks);

		d.resolve(newPublishedBooks);
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
