var modelBookList = require( 'shelf/lib/modelBookList' );
var Q = require('q');

module.exports = function( data ){
   var d       = Q.defer();
   var newBook = data.newBook;

   var searchExpression = {
      ASIN: newBook.ASIN
   };

   modelBookList.findOne( searchExpression, function( err, bookInDB ){
      var result;
      if( bookInDB ){
         result = false;
      }else{
         result = true;
      }
      data.book      = newBook;
      data.isNewBook = result;
      d.resolve( data );
   });

   return d.promise;
};
