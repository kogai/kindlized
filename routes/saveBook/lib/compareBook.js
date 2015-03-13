var modelBookList = require( 'shelf/lib/modelBookList' );
var Q = require('q');

module.exports = function( entryBook ){
   var d = Q.defer();
   var searchExpression = {
      "_id": entryBook._id
      // ASIN: entryBook.ASIN
   };
   modelBookList.findOne( searchExpression, function( err, bookInDB ){
      var result;
      if( bookInDB ){
         result = true;
      }else{
         result = false;
      }
      d.resolve( result );
   });
   return d.promise;
};
/*
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
		    images          : book.images,
		    isKindlized	    : false
			});

			newBook.save( function(err){
				if(err) console.log(err);
				console.log( book.title, 'regist is success' );
			});
		}
	});
*/
