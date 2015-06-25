var modelBookList = require( 'models/Book' );
var Q = require('q');

module.exports = function( data ){
  "use strict";
   var d       = Q.defer();
   var newBook = data.newBook;

   var searchExpression = {
      ASIN: newBook.ASIN
   };

   modelBookList.findOne( searchExpression, function( err, bookInDB ){
     if(err){
       d.reject(err);
     }
      var result;
      if( bookInDB ){
         result = false;
      }else{
         result = true;
      }
      data.book = bookInDB;
      data.isNewBook = result;
      d.resolve( data );
   });

   return d.promise;
};
