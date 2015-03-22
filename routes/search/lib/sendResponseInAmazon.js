var Q = require('q');
var _ = require('underscore');
var modelBookList = require('shelf/lib/modelBookList');

module.exports = function( data ){
	var d = Q.defer();
	var res = data.res;

	data.bookListInAmazon = _.compact( data.bookListInAmazon );

	reduceRudundancy( data.bookListInAmazon )
	.done(function(bookListInAmazon){
		res.send({
			bookListInAmazon: bookListInAmazon,
		});
		data.bookListInAmazon = bookListInAmazon;
		d.resolve( data );
	});
	return d.promise;
};

var reduceRudundancy = function( bookListInAmazon ){
	var d = Q.defer();

	if( bookListInAmazon.length > 0 ){
		var query = bookListInAmazon.map( function( book, index, array ){
			var bookQuery = book.ASIN;
				return bookQuery;
		});

		modelBookList.find( { ASIN: { $in: query } }, function( err, books ){
			var uniqBookList = bookListInAmazon.map( function( book, index, bookListInAmazon ){
				var isUniqBook = true;
				for (var i = 0; i < books.length; i++) {
					var rawBook = books[i];
					if( book.ASIN[0] === rawBook.ASIN[0] ){
						isUniqBook = false;
					}
				}
				if(isUniqBook){
					return book;
				}
			});
			uniqBookList = _.compact( uniqBookList );
			d.resolve( uniqBookList );
		});
	}else{
		d.resolve( bookListInAmazon );
	}

	return d.promise;
};
