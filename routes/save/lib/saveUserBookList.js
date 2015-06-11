var Q = require('q');
var modelUser = require('models/User');
var constant = require('common/constant');

module.exports = function(data) {
	"use strict";
	var d = Q.defer();

	var req = data.req;
	var book = data.book;
	var bookId = book._id;
	var addBook = {
		bookId: bookId,
		isNotified: false
	};
	var userId = req.session.passport.user;

	modelUser.findOneAndUpdate({
		_id: userId
	}, {
		$push: {
			bookList: addBook
		}
	}, function(err, user) {
		if (err) {
			d.reject(err);
		}
		data.user = user;
		d.resolve(data);
	});

	return d.promise;
};
