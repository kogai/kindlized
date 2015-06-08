"use strict";

var Q = require('q');

var fetchBookListNotKindlized = require('librarian/lib/inspectBookList/fetchBookListNotKindlized');
var inspectBook = require('librarian/lib/inspectBookList/inspectBook');
var modifyDetailUrl = require('librarian/lib/modifyDetailUrl');
var log = require('common/log');

module.exports = function() {
  var d = Q.defer();
  fetchBookListNotKindlized()
    .then(inspectBook)
    .done(function(bookList) {
      log.info(bookList.length + '冊のkindle化調査処理を完了');
      d.resolve();
    });
  return d.promise;
};
