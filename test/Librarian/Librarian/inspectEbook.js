"use strict";

var util = require('util');

var Librarian = require('Librarian/Librarian');
var lib = new Librarian();

var mock = require('./mock_ebook').relatedItem;
var log = require('common/log');

var res = lib.inspectEbook(mock);

log.info(res);
