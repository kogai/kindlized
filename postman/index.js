var Q = require('q');

var fetchUserModel = require( 'postman/lib/fetchUserModel' );
var postMailToUser = require( 'postman/lib/postMailToUser' );

module.exports = function(){
   // *1日に一度実行する
   fetchUserModel()
   .then( function( data ){

      var d       = Q.defer();
      var users   = data.users;

      Q.all( users.map( postMailToUser ) )
      .done( function(){
         console.log('done');
         d.resolve( data );
      });

      return d.promise;
   })
   .done( function( data ){
      console.log( 'postmanの処理が完了' );
   });
};
