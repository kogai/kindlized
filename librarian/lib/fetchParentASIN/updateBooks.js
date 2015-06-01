"use strict";

var Q = require('q');
var modelBookList = require('models/BookList');
var log = require('common/log');

module.exports = function(books) {
	var def = Q.defer();

	Q.all(
			books.map(function(book) {
				var d = Q.defer();
				var query = {
					_id: book._id,
					ASIN: book.ASIN
				};
				var modify = {
					AuthorityASIN: book.AuthorityASIN,
					lastModifiedLogs: {
						fetchParentASIN: book.lastModifiedLogs.fetchParentASIN
					}
				};
				modelBookList.findOneAndUpdate(
					query, modify,
					function(err, book) {
						log.info(book.ASIN + ' : ' + book.AuthorityASIN + ' : ' + book.title);
						d.resolve(book);
					}
				);
				return d.promise;
			})
		)
		.done(function(modBooks) {
			def.resolve(modBooks);
		});

	return def.promise;
};
