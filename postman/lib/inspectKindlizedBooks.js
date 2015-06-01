"use strict";
// userモデルのbookListからkindle化されているものを抽出してpostList配列に格納

var Q = require('q');
var _ = require('underscore');
var modelBookList = require('models/BookList');
var log = require('common/log');

module.exports = function(user) {
	var d = Q.defer();

	var postList = user.postList;

	modelBookList.find({
		_id: {
			$in: postList
		}
	}, function(err, books) {
		log.info('\n', books.length);


		user.kindlizedList = books.map(function(book) {
			if (book.isKindlized === true) {
				return book;
			}
		});

		log.info('\n', user.kindlizedList);
    user.kindlizedList = _.compact(user.kindlizedList);
		d.resolve(user);
	});

	return d.promise;
};
