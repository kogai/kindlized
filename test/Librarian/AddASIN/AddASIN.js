"use strict";

var AddASIN = require('Librarian/AddASIN')({ limit: 100 });

var log = require('common/log');

AddASIN.cron().done(function(books){
	books.map(function(book){
		return log.info(book.title);
		// return log.info(book.title + ':' + book.url);
	});
});
