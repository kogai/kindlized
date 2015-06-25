"use strict";
var log = require('common/log');
var BookList = require('models/BookList');
var Book = require('models/Book');

BookList.find({}, function(err, booklists){
	booklists.forEach(function(book){
		var newBook = new Book(book);
		newBook.save(function(err){
			if(err){
				log.info(err);
			}
		});
	});
});
