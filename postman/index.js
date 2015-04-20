var Q = require('q');

var fetchUserModel = require( 'postman/lib/fetchUserModel' );
var postMailToUser = require( 'postman/lib/postMailToUser' );
var inspectNewRelease = require('librarian/lib/inspectNewRelease');
var logPostman = require('common/logEx').postman;

module.exports = (function(){
  "use strict";
   // *1日に一度実行する
  Q.when()
    .then(inspectNewRelease)
    .then(fetchUserModel)
    .then( function( data ){

      var d       = Q.defer();
      var users   = data.users;

      Q.all( users.map( postMailToUser ) )
      .done( function(){
         logPostman.info('done');
         d.resolve( data );
      });

      return d.promise;
   })
   .done( function(){
      logPostman.info( 'postmanの処理が完了' );
   });
}());
