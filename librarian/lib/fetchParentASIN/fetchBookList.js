var Q                = require('q');
var ModelBookList    = require( 'shelf/lib/modelBookList' );
var reduceListByDate = require('common/reduceListByDate');

module.exports = function( bookList ) {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();
  ModelBookList.find( {}, function( err, result ) {
     reduceListByDate( result)
     .then( function( result){
        d.resolve( result );
     });
  });
  return d.promise;
}
