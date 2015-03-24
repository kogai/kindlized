// userモデルのbookListからkindle化されているものを抽出してpostList配列に格納

var Q = require('q');
var _ = require('underscore');
var modelBookList = require('shelf/lib/modelBookList');
var logPostman = require('common/logEx').postman;

module.exports = function(user) {
	var d = Q.defer();

	var postList = user.postList;
	var kindlizedList = [];

	modelBookList.find({
		_id: {
			$in: postList
		}
	}, function(err, books) {
		logPostman.info('\n', books.length);


		user.kindlizedList = books.map(function(book) {
			if (book.isKindlized === true) {
				return book;
			}
		});

		logPostman.info('\n', user.kindlizedList);
    user.kindlizedList = _.compact(user.kindlizedList);
		d.resolve(user);
	});

	return d.promise;
};
