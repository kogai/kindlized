"use strict";

var heapdump = require('heapdump');
var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

// AddBook.limit = 5;

AddBook.run(function(err){
	if(err){
		return log.info(err);
	}
	log.info('AddBook.run end.');
});
