// userモデルのbookListからisNotifiedがfalseのものを抽出してpostList配列に格納

var  Q = require('q');
var _ = require('underscore');
var logPostman = require('common/logEx').postman;

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
   postList = _.compact(postList);
   logPostman.info('\n', bookList);
   logPostman.info('\n', postList);
   user.postList = postList;

   d.resolve( user );
   return d.promise;
};
