"use strict";

var AddASIN = require('Librarian/AddASIN')();

var log = require('common/log');
var mock = require('test/Librarian/AddASIN/mock');

AddASIN._updates(mock[1])
.fail(function(err){
	log.info(err);
})
.done(function(book){
	log.info(book);
});
