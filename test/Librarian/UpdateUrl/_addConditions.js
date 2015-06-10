"use strict";

var UpdateUrl = require('Librarian/UpdateUrl')({ limit: 50 });
var log = require("common/log");
var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

var conditinalizeBooks = UpdateUrl._addConditions([
	{ AuthorityASIN: ['B003UUWF8W'] },
	{ AuthorityASIN: ['B00Z6K2B0G'] }
]);

log.info(conditinalizeBooks);
