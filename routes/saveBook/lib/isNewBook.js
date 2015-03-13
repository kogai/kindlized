var modelBookList = require( 'shelf/lib/modelBookList' );
var Q = require('q');

module.exports = function( entryBook ){
   var d = Q.defer();
   var searchExpression = {
      ASIN: entryBook.ASIN
   };
   modelBookList.findOne( searchExpression, function( err, bookInDB ){
      var result;
      if( bookInDB ){
         result = false;
      }else{
         result = true;
      }
      var data = {
         entryBook: entryBook,
         isNewBook: result
      };
      d.resolve( data );
   });

   return d.promise;
};
