"use strict";

var heapdump = require('heapdump');
var AddBook = require('Librarian/AddBook')();
var log = require('common/log');

// AddBook.limit = 5;

heapdump.writeSnapshot('./logs/before.heapsnapshot');

AddBook.run(function(err){
	if(err){
		return log.info(err);
	}
	heapdump.writeSnapshot('./logs/after.heapsnapshot');
	log.info('AddBook.run end.');
});
