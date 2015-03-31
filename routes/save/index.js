var Q = require('q');
var express = require('express');
var router = express.Router();

var isNewBook = require('routes/save/lib/isNewBook');
var saveBookList = require('routes/save/lib/saveBookList');
var saveUserBookList = require('routes/save/lib/saveUserBookList');

var isNewAuthor = require('routes/save/lib/isNewAuthor');
var saveUserAuthorList = require('routes/save/lib/saveUserAuthorList');

router.post('/', function(req, res) {
	"use strict";
	var newBook = req.body.newBook;
	Q.when({
			req: req,
			res: res,
			newBook: newBook
		})
		.then(isNewBook)
		.then(saveBookList)
		.then(saveUserBookList)
		.then(isNewAuthor)
		.then(saveUserAuthorList)
		.done(function() {
			res.send({
				newBook: newBook
			});
		});
});

module.exports = router;
