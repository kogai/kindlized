var modelBookList = require('shelf/modelBookList.js');
var Q = require('q');

module.exports = function( isNewBook ){
	var d = Q.defer();

	if( isNewBook ){
		var newBook = new modelBookList({
			status          : book.satus,
			ASIN            : book.ASIN,
			EAN             : book.EAN,
			author          : book.author,
			title           : book.title,
			publisher       : book.publisher,
			publicationDate : book.publicationDate,
			price           : book.price,
			url             : book.url,
			images          : book.images,
			isKindlized	    : false
		});

		newBook.save( function(err){
			if(err) console.log(err);
			console.log( book.title, 'regist is success' );
		});
	}

	return d.promise;
};
