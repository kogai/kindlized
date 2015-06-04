"use strict";

var Q = require('q');
var _ = require('underscore');
var express = require('express');
var router = express.Router();

var log = require('common/log');
var modelBookList = require('models/BookList');
var modelAuthor = require('models/Author');
var constant = require('common/constant');

var OpHelper = require('apac').OperationHelper;
var MakeOpConfig = require('common/makeOpConfig');

var makeExistenceExpression = require('routes/search/lib/makeExistenceExpression');
var fetchBookListDB = require('routes/search/lib/fetchBookListDB');
var sendResponseInDB = require('routes/search/lib/sendResponseInDB');

var fetchBookListAmazon = require('routes/search/lib/fetchBookListAmazon');
var handleBookListFromAmazon = require('routes/search/lib/handleBookListFromAmazon');
var sendResponseInAmazon = require('routes/search/lib/sendResponseInAmazon');
var searchAuthorityASIN = require('routes/search/lib/searchAuthorityASIN');
var lookUpAuthorityASIN = require('routes/search/lib/lookUpAuthorityASIN');
var saveBookListToDB = require('routes/search/lib/saveBookListToDB');
var fetchBookListFromAmazon = require('routes/search/lib/fetchBookListFromAmazon');
var fetchAuthorListAmazon = require('routes/search/lib/fetchAuthorListAmazon');
var saveNewAuthor = require('routes/search/lib/saveNewAuthor');

var opConfig = new MakeOpConfig();
var opExistenceBook = new OpHelper(opConfig);

router.post('/db', function(req, res) {
	Q.when({
		res: res,
		req: req
	})
	.then(fetchBookListDB)
	.then(sendResponseInDB)
	.done(function(data) {
		log.info('DB内の検索処理完了.');
	});
});

router.post('/amazon', function(req, res) {
	Q.when({
		res: res,
		req: req
	})
	.then(fetchBookListAmazon)
	.then(handleBookListFromAmazon)
	.then(searchAuthorityASIN)
	.then(lookUpAuthorityASIN)
	.then(saveBookListToDB)
	.then(sendResponseInAmazon)
	.then(fetchBookListFromAmazon)
	.then(fetchAuthorListAmazon)
	.then(saveNewAuthor)
	.done(function(data) {
		log.info('AmazonAPIの検索処理完了.');
	});
});

module.exports = router;
