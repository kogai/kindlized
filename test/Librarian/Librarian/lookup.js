"use strict";

var RepairImg = require('Librarian/RepairImg')({ limit: 50 });
var log = require('common/log');
var util = require('util');

// { ASIN: ["4091870848"] } 既にImageSetsがある
// { ASIN: ["4091870848"] } まだない

RepairImg.lookup({
	ASIN: ["4091870848"],
	conditions: {
		ItemId: "4091870848"
	}
}, function(book){
	log.info(util.inspect(book, null, null));
});
