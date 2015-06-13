"use strict";

var Operator = require('common/Operator');
var Collector = require('common/Collector')('book');
var Search = {};

var log = require('common/log');

Search.amazon = function(req, res){
	var query = req.body.newBook;
	var searchOperator = Operator({
		type: "Title",
		query: query
	});

	searchOperator.run(function(err, books){
		res.send(books);
		Collector.saveCollections(books, function(err, savedBooks){
			if(err){
				return log.info(err);
			}
			log.info(savedBooks);
		});
	});
};

module.exports = Search;
