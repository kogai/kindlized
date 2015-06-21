"use strict";

var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

// AddBook.limit = 5;

AddBook.fetch(function(err, authors){
	if(err){
		return log.info(err);
	}
	AddBook.sequential(function(err, items){
		if(err){
			return log.info(err);
		}
		log.info(items.length);
	});
});
