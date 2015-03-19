// userモデルのbookListからkindle化されているものを抽出してpostList配列に格納

var  Q = require('q');
var modelBookList = require( 'shelf/lib/modelBookList' );

module.exports = function( user ){
   var d = Q.defer();

   var postList      = user.postList;
   var kindlizedList = [];

   modelBookList.find( { _id: { $in: postList } }, function( err, books ){
      for (var i = 0; i < books.length; i++) {
         var book = books[i];
         if( book.isKindlized ){
            kindlizedList.push( book );
         }
      }
      user.kindlizedList = kindlizedList;
      d.resolve( user );
   });

   return d.promise;
};
