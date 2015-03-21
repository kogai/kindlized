var Q = require('q');
var kindlizedBookList = require('librarian/lib/modifyDetailUrl/kindlizedBookList');
var lookUpAuthority = require('librarian/lib/modifyDetailUrl/lookUpAuthority');
var lookUpEbooks = require('librarian/lib/modifyDetailUrl/lookUpEbooks');
var modifyUrl = require('librarian/lib/modifyDetailUrl/modifyUrl');

module.exports = function() {
  var d = Q.defer();
  kindlizedBookList()
  .then(lookUpAuthority)
  .then(lookUpEbooks)
  .then(modifyUrl)
  // modifyUrl
  // URLを書き換え
  // 書き換え済みフラグを立てる
  .done(function( books ){
      var titles = books.map( function( book ){
        // return book.title;
        return book.ebookASIN + ':' + book.title;
        // return book;
      });
      console.log( titles );
    console.log('URLを書き換え完了');
    d.resolve();
  });
  return d.promise;
};
