"use strict";

var Q = require('q');

var BookList = require('models/BookList');
var log = require('common/log');

var saveBook = function(book) {
	var def = Q.defer();

	BookList.findOne({
		ASIN: book.ASIN
	}, function(err, dbBook) {
		if (dbBook) {
			def.resolve();
		}else{
			// 戻り値が無ければ === 新規の書籍ならば登録する
			var newBook = new BookList({
				status: book.satus,
				ASIN: book.ASIN,
				EAN: book.EAN,
				author: book.author,
				title: book.title,
				publisher: book.publisher,
				publicationDate: book.publicationDate,
				price: book.price,
				url: book.url,
				images: book.images,
				isKindlized: false
			});

			newBook.save(function(err) {
				if (err) {
					log.info(err);
				}
				log.info(book.title, 'を追加した');
				def.resolve();
			});
		}
	});

	return def.promise;
};

module.exports = function(author) {
	var d = Q.defer();

	var bookList = author.bookList;

	if (bookList.length === 0) {
		d.resolve(author);
	}else{
	  Q.all(bookList.map(saveBook))
	  .done(function(){
			d.resolve(author);
		});
	}

	return d.promise;
};
