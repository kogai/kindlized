// 全てのuserモデルを取得

var Q          = require('q');
var modelUser  = require( 'user/lib/modelUser' );

module.exports = function(){
   var d = Q.defer();
   var data = {};

   modelUser.find( {}, function( err, users ){
      data.users = users;
      d.resolve( data );
   });

   return d.promise;
};
