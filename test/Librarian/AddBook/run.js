"use strict";

var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

AddBook.limit = 3;

AddBook.run(function(err){
	if(err){
		return log.info(err);
	}
});
