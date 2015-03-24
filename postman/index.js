var Q = require('q');

var fetchUserModel = require( 'postman/lib/fetchUserModel' );
var postMailToUser = require( 'postman/lib/postMailToUser' );
var logPostman = require('common/logEx').postman;

module.exports = function(){
   // *1日に一度実行する
   fetchUserModel()
   .then( function( data ){

      var d       = Q.defer();
      var users   = data.users;

      Q.all( users.map( postMailToUser ) )
      .done( function( resultarry ){
         logPostman.info('done');
         d.resolve( data );
      });

      return d.promise;
   })
   .done( function( data ){
      logPostman.info( 'postmanの処理が完了' );
   });
};
