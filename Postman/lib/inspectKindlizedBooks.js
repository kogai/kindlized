"use strict";
// userモデルのbookListからkindle化されているものを抽出してpostList配列に格納

var Q = require('q');
var _ = require('underscore');
var modelBookList = require('models/Book');
var log = require('common/log');

module.exports = function(user) {
	var d = Q.defer();

	var postList = user.postList;

	modelBookList.find({
		_id: {
			$in: postList
		}
	}, function(err, books) {
		if(err){
			log.warn.info(err);
			return d.reject(err);
		}

		user.kindlizedList = books.map(function(book) {
			if (book.isKindlized === true) {
				return book;
			}
		});

    user.kindlizedList = _.compact(user.kindlizedList);
		log.info("通知対象の書籍: " + user.kindlizedList.length + "冊");
		d.resolve(user);
	});

	return d.promise;
};
