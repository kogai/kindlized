var kindlizedBookList = require('librarian/lib/modifyDetailUrl/kindlizedBookList');
var Q = require('q');

module.exports = function() {
  var d = Q.defer();
  kindlizedBookList()
  // lookUpEbook
  // modifyDetailUrl
  // URLを書き換え
  // 書き換え済みフラグを立てる
  .done(function( books ){
    var titles = books.map( function( book ){
      return book.title;
    });
    console.log( titles );
    console.log('URLを書き換え完了');
    d.resolve();
  });
  return d.promise;
};
