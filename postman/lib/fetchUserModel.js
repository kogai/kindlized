// 全てのuserモデルを取得

var Q          = require('q');
var modelUser  = require( 'user/' );
var logPostman = require('common/logEx').postman;

module.exports = function(){
   var d = Q.defer();
   var data = {};

   modelUser.find( {}, function( err, users ){
     logPostman.info(err);
     logPostman.info(users);
      data.users = users;
      d.resolve( data );
   });

   return d.promise;
};
