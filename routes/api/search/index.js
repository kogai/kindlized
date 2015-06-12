"use strict";

var Operator = require('common/Operator');

module.exports = function(req, res){
	var query = req.body.newBook;
	var searchOperator = Operator({
		type: "Title",
		query: query
	});

	searchOperator.run(function(err, books){
		res.send(books);
	});
};
