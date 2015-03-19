// userモデルのbookListからisNotifiedがfalseのものを抽出してpostList配列に格納

var  Q = require('q');

module.exports = function( user ){
   var d = Q.defer();

   var bookList = user.bookList;
   var postList = [];

   for (var i = 0; i < bookList.length; i++) {
      var book = bookList[i];
      if( book.isNotified === false ){
         postList.push( book.bookId );
      }
   }
   user.postList = postList;

   d.resolve( user );
   return d.promise;
};
