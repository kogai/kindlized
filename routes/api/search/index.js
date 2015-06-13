"use strict";

var Operator = require('common/Operator');
var Search = {};

Search.amazon = function(req, res){
	var query = req.body.newBook;
	var searchOperator = Operator({
		type: "Title",
		query: query
	});

	searchOperator.run(function(err, books){
		res.send(books);
	});
};

module.exports = Search;
