var Q                = require('q');
var ModelBookList    = require( 'shelf/lib/modelBookList' );
var reduceListByDate = require('common/reduceListByDate');

module.exports = function( bookList ) {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();
  console.log('DBから著者リストを非同期に取得する');
  ModelBookList.find( {}, function( err, result ) {
      console.log(result.length + '冊の書籍データが存在する');
      d.resolve( result );
  });
  return d.promise;
};
