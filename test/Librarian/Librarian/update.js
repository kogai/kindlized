"use strict";

var Librarian = require('Librarian/Librarian');
var lib = new Librarian();

var log = require('common/log');
var util = require('util');

var book = { ASIN: ["4091870848"] };
var update = { images: "test-case" };

lib.update(book, update, function(err, res){
	if(err){
		return log.info(err);
	}
	log.info(res);
});
