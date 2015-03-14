// userモデルのbookListのisNotifiedをtrueに変更

var Q = require('q');
var modelUser  = require( 'user/lib/modelUser' );

module.exports = function( user ){
   var d = Q.defer();

   // console.log( user.postList.length );
   // console.log( user.bookList.length );
   // console.log( user.kindlizedList.length );

   var kindlizedList    = user.kindlizedList;
   var bookList         = user.bookList;
   var _id              = user._id;
   var notifiedBookIds  = [];

   for (var i = 0; i < kindlizedList.length; i++) {
      notifiedBookIds.push( kindlizedList[i]._id );
   }

   for (var j = 0; j < bookList.length; j++) {
      for (var k = 0; k < notifiedBookIds.length; k++) {
         if( bookList[j].bookId === notifiedBookIds[k].toString() ){
            bookList[j].isNotified = true;
         }
      }
   }

	modelUser.findOneAndUpdate( { _id: _id }, { bookList: bookList }, function( err, user ){
      d.resolve( user );
   });

   return d.promise;
}
