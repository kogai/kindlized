"use strict";

var RepairImg = require('Librarian/RepairImg')({
	limit: 10
});

var log = require('common/log');

RepairImg.cron().done(function(books){
	books.map(function(book){
		return log.info(book.title);
		// return log.info(book.title + ':' + book.url);
	});
});
