"use strict";

var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

// AddBook.limit = 10000;

AddBook.run(function(err){
	if(err){
		return log.info(err);
	}
});
