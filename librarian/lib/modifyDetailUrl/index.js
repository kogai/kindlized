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
  .done(function( books ){
    var titles = books.map( function( book ){
      return book.AuthorityASIN + ':' + book.title + ':\n' + book.url;
    });
    console.log('URLを書き換え完了');
    d.resolve();
  });
  return d.promise;
};
