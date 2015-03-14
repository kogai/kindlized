var Q           = require('q');
var ModelAuthor = require( 'author/lib/modelAuthor' );

module.exports = function( authorList ) {
  // DBから著者リストを非同期に取得する
  var d = Q.defer();
  ModelAuthor.find( {}, function( err, result ) {
    for (var i = 0; i < result.length; i++) {
      authorList.push(result[i].name);
    }
    console.log( authorList.length, '人の著者が登録されている' );
    d.resolve(authorList);
  });
  return d.promise;
};
