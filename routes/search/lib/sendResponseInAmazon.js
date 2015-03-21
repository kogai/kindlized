var Q = require('q');
var _ = require('underscore');
var modelBookList = require('shelf/lib/modelBookList');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;

	reduceRudundancy( data.bookListInAmazon )
	.done(function(bookListInAmazon){
		console.log(bookListInAmazon);
		res.send({
			bookListInAmazon: bookListInAmazon,
		});
		d.resolve( data );
	});
	return d.promise;
};

var reduceRudundancy = function( bookListInAmazon ){
	var d = Q.defer();

	var query = bookListInAmazon.map( function( book, index, array ){
		var bookQuery = book.ASIN;
			return bookQuery;
	});

	modelBookList.find( { ASIN: { $in: query } }, function( err, books ){
		var uniqBookList = books.map( function( book, index, books ){
			for (var i = 0; i < bookListInAmazon.length; i++) {
				var rawBook = bookListInAmazon[i];
				if( book.ASIN !== rawBook.ASIN ){
					return book;
				}
			}
		});
		uniqBookList = _.compact( uniqBookList );
		d.resolve( uniqBookList );
	});

	return d.promise;
};
