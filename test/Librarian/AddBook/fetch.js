"use strict";

var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

AddBook.limit = 10000;

AddBook.fetch(function(err, authors){
	if(err){
		return log.info(err);
	}
	authors.map(function(author){
		return log.info(author.lastModified + ':' + author.pageId + ":" + author.name);
	});
});
