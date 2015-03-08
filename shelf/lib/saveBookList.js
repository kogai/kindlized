var ModelBookList = require('./modelBookList.js');

module.exports = function( authorData ){
	var author 		= authorData.author;
	var bookList 	= authorData.bookList;

	for (var i = 0; i < bookList.length; i++) {
		var book = bookList[i];
		saveBook( book );
	}
};

var saveBook = function( book ){
	ModelBookList.findOne( { ASIN: book.ASIN }, function( err, dbBook ){
		if( !dbBook ){

			var newBook = new ModelBookList({
		    status          : book.satus,
		    ASIN            : book.ASIN,
		    EAN             : book.EAN,
		    author          : book.author,
		    title           : book.title,
		    publisher       : book.publisher,
		    publicationDate : book.publicationDate,
		    price           : book.price,
		    url             : book.url,
		    is_kindlized    : false
			});

			newBook.save( function(err){
				if(err) console.log(err)
				console.log( book.title, 'regist is success' );
			});
		}
	});
};
