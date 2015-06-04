"use strict";
// 全てのuserモデルを取得

var Q          = require('q');
var modelUser  = require( 'user/' );
var log = require('common/log');

module.exports = function(){
   var d = Q.defer();
   var data = {};

   modelUser.find( {}, function( err, users ){
     if(err){
       return log.info(err);
     }
     log.info(users);
      data.users = users;
      d.resolve( data );
   });

   return d.promise;
};
