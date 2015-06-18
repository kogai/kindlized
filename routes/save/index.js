"use strict";

var Q = require('q');
var express = require('express');
var router = express.Router();

var isNewBook = require('routes/save/lib/isNewBook');
var saveBookList = require('routes/save/lib/saveBookList');
var saveUserBookList = require('routes/save/lib/saveUserBookList');

var BookList = require('models/BookList');
var log = require('common/log');

var saveBook = function(req, res, newBook){
	Q.when({
		req: req,
		res: res,
		newBook: newBook
	})
	.then(isNewBook)
	.then(saveBookList)
	.then(saveUserBookList)
	.done(function() {
		res.send({
			newBook: newBook
		});
	});
};

router.post('/', function(req, res) {
	var payload = req.body;
	var newBook = payload.newBook;

	if(payload.isAuthorPage){
		BookList.findOne({
			ASIN: payload.ASIN
		}, function(err, book){
			if(err){
				return console.log(err);
			}
			saveBook(req, res, book);
		});
	}else{
		saveBook(req, res, newBook);
	}
});

module.exports = router;
