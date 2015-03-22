var Q = require('q');
var fetchBookListNotKindlized = require('lib/inspectBookList/fetchBookListNotKindlized');
var inspectBook = require('lib/inspectBookList/inspectBook');
var modifyDetailUrl = require('librarian/lib/modifyDetailUrl');

module.exports = function() {
  var d = Q.defer();
  Q.when()
    .then(fetchBookListNotKindlized)
    .then(inspectBook)
    .done(function(bookList) {
      console.log(bookList.length, 'inspectBookListの処理を完了');
      d.resolve();
    });
  return d.promise;
};
