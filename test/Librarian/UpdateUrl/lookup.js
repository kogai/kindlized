"use strict";

var UpdateUrl = require('Librarian/UpdateUrl')();

var log = require('common/log');
var util = require('util');

UpdateUrl.lookup({
	ASIN: ["B003UUWF8W"],
	conditions: {
		ItemId: "B003UUWF8W"
	}
}).done(function(book){
	log.info(util.inspect(book, null, null));
});

UpdateUrl.lookup({
	ASIN: ["B00Z6K2B0G"],
	conditions: {
		ItemId: "B00Z6K2B0G"
	}
}).done(function(book){
	log.info(util.inspect(book, null, null));
});
