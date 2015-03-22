var Q = require('q');
var _ = require('underscore');

var modelBookList = require('shelf/lib/modelBookList');
var saveBook = require('common/saveBook');

module.exports = function(data) {
  var d = Q.defer();
  var bookListInAmazon = data.bookListInAmazon;

  Q.all(
      bookListInAmazon.map(function(book) {
        var def = Q.defer();
        saveBook(book)
          .done(function(book) {
            def.resolve(book);
          });
        return def.promise;
      })
    )
    .done(function(savedBooks) {
      savedBooks = _.compact( savedBooks );
      data.savedBooks = savedBooks;
      d.resolve(data);
    });

  return d.promise;
};
