var Q = require('q');
var express = require('express');
var router = express.Router();
var bookListInDB = require('routes/book/lib/bookListInDB');
var bookListInUser = require('routes/book/lib/bookListInUser');
var intro = require('routes/book/lib/intro');

router.get('/intro', function(req, res) {
	"use strict";
	intro(req, res);
});

router.get('/user', function(req, res) {
	"use strict";
	bookListInUser(req, res);
});

router.get('/', function(req, res) {
	"use strict";
	bookListInDB(req, res);
});

module.exports = router;
