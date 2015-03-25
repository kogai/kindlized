var Q = require('q');
var util = require('util');
var _ = require('underscore');
var itemLookUp = require('common/itemLookUp');

module.exports = function( book ){
	var def = Q.defer();

	var expression = {
	  ItemId: book.ASIN[0],
	  RelationshipType: 'AuthorityTitle',
	  ResponseGroup: 'RelatedItems'
	};

	var callback = function( response ){
		var relatedItems = response.ItemLookupResponse.Items[0].Item[0].RelatedItems;
		relatedItems = relatedItems.map(function(relatedItem){
			if(relatedItem.Relationship[0] === 'Parents' ){
				return relatedItem;
			}
		});
		relatedItems = _.compact(relatedItems);

		var AuthorityASIN = relatedItems[0].RelatedItem[0].Item[0].ASIN;
		book.AuthorityASIN = AuthorityASIN;

		return book;
	};

	var errorCallback = function( error ){
		book.AuthorityASIN = ['UNDEFINED'];
		return book;
	};

	itemLookUp(
		expression,
		callback,
		errorCallback
	)
	.done(function(result){
		def.resolve(book);
	});

	return def.promise;
};
