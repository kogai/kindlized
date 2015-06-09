"use strict";

var Librarian = require('Librarian/Librarian');
var lib = new Librarian();

var log = require('common/log');
var util = require('util');

// { ASIN: ["4091870848"] } 既にImageSetsがある
// { ASIN: ["4091870848"] } まだない

console.log("lookup.");

lib.lookup({
	ASIN: ["4091870848"],
	conditions: {
		ItemId: "4091870848"
	}
}, function(book) {
	// log.info(util.inspect(book, null, null));
	log.info(book.res.ItemLookupResponse.Items[0].Item[0].ImageSets);
});
