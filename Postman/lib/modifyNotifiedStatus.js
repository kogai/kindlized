'use strict';

// userモデルのbookListのisNotifiedをtrueに変更

var Q = require('q');
var modelUser  = require( 'models/User' );

module.exports = function(user){
   var d = Q.defer();

   var kindlizedList    = user.kindlizedList;
   var bookList         = user.bookList;
   var _id              = user._id;
   var notifiedBookIds  = [];
   var i, j, k;
   for (i = 0; i < kindlizedList.length; i++) {
      notifiedBookIds.push( kindlizedList[i]._id );
   }

  for (j = 0; j < bookList.length; j++) {
    for (k = 0; k < notifiedBookIds.length; k++) {
       if( bookList[j].bookId.toString() === notifiedBookIds[k].toString() ){
          bookList[j].isNotified = true;
       }
    }
  }

  modelUser.findOneAndUpdate( { _id: _id }, { bookList: bookList }, function( err, user ){
    if(err){
      return d.reject(err);
    }
    d.resolve(user);
  });

   return d.promise;
};
