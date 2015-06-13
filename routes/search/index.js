"use strict";

var Q = require('q');
var _ = require('underscore');
var express = require('express');
var router = express.Router();

var log = require('common/log');
var makeExistenceExpression = require('routes/search/lib/makeExistenceExpression');
var fetchBookListDB = require('routes/search/lib/fetchBookListDB');
var sendResponseInDB = require('routes/search/lib/sendResponseInDB');

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


module.exports = router;
