var Q             = require( 'q' );
var moment        = require( 'moment-timezone' );
var modelAuthor   = require( 'models/Author' );

module.exports = function( authorData ) {
   // 著者リストの最終編集日をアップデート
   var d = Q.defer();
   var author = authorData.author;
   var modifiedTime = moment();

   modelAuthor.findOneAndUpdate( { name: author }, { lastModified: modifiedTime }, function( err, author ){
      d.resolve( authorData );
   });

   return d.promise;
};
