var Q = require('q');
var fetchUserModel = require( 'postman/lib/fetchUserModel' );
var postMailToUser = require( 'postman/lib/postMailToUser' );

// module.exports = function(){
   // *1日に一度実行する

   // 全ての処理を完了
   fetchUserModel()
   .then( function( data ){
      var d = Q.defer();

      var users = data.users
      for (var i = 0; i < users.length; i++) {
         var user = users[i];
         postMailToUser( user )
         if( i === users.length - 1 ) d.resolve( data );
      }

      return d.promise;
   })
   .done( function( data ){
      console.log( 'postmanの処理が完了' );
   });

// };
