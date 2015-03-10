var Q             = require('q');
var ModelBookList = require( '../../../shelf/lib/modelBookList' );

module.exports = function( bookList ) {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();
  ModelBookList.find( {}, function( err, result ) {
    d.resolve( result );
  });
  return d.promise;
}
