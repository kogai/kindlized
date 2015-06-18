"use strict";

var fs = require('fs');

var Librarian = require('Librarian/Librarian');
var lib = new Librarian({
	amazonConditions: {
    RelationshipType: 'AuthorityTitle',
		ResponseGroup: 'ItemAttributes, Large, ItemIds, RelatedItems'
	}
});

var log = require('common/log');
var util = require('util');

// { ASIN: ["4091870848"] } 既にImageSetsがある
// { ASIN: ["4091870848"] } まだない

lib.lookup({
	ASIN: ["B00ZEHKJ6O"],
	conditions: {
		ItemId: "B00ZEHKJ6O"
	}
})
.then(function(retrieved){
	log.info(util.inspect(retrieved, null, null));
	// log.info(book.res.ItemLookupResponse.Items[0].Item[0].ImageSets);
});
