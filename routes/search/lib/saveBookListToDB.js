"use strict";

var Q = require('q');
var _ = require('underscore');
var log = require('common/log');

var modelBookList = require('shelf/lib/modelBookList');
var saveBook = require('common/saveBook');

module.exports = function(data) {
  var d = Q.defer();
  var bookListInAmazon = data.bookListInAmazon;

  Q.all(
      bookListInAmazon.map(function(book) {
        console.log('保存する書籍は',book.title);
        var def = Q.defer();
        saveBook(book)
        .done(function(book) {
          def.resolve( book );
        });
        return def.promise;
      })
    )
    .done(function(savedBooks) {
      console.log('書籍の登録が完了', savedBooks);
      savedBooks = _.compact( savedBooks );
      data.savedBooks = savedBooks;
      d.resolve(data);
    });

  return d.promise;
};
