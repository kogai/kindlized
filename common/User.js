"use strict";
var log = require('common/log');

class User {
	constructor(){
		this.Series = require('Librarian/Series');
		this.UserCollections = require('models/User');
		this.BookCollections = require('models/Book');
	}

	saveBook(book, done){
		// var conditions = { $in: { bookId: ASIN: book._id } };
		var conditions = { "bookList" };
	}

	saveSeries(seriesKeyword){

	}

	fetchRegisteredBooks(){

	}

	fetchRegisteredSeries(){

	}
}

/*
var Q = require('q');
var modelUser = require('models/User');

module.exports = function(data) {
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
*/
