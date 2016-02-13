'use strict';
// userモデルのbookListからisNotifiedがfalseのものを抽出してpostList配列に格納

var Q = require('q');
var _ = require('underscore');
var log = require('common/log');

module.exports = function(user) {
  var d = Q.defer();

  var bookList = user.bookList;
  var postList = [];
  var i, book;

  for (i = 0; i < bookList.length; i++) {
     book = bookList[i];
     if ( book.isNotified === false ) {
        postList.push( book.bookId );
      }
   }

  postList = _.compact(postList);
  user.postList = postList;

  d.resolve( user );
  return d.promise;
};
