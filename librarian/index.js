/*
parentsASIN-RelatedItemsのチェックが失敗してるっぽい
- [ ] シドニアの騎士(10)
- [ ] 青空エール 3 (マーガレットコミックス)
- [ ] 姉の結婚 2 (フラワーコミックスアルファ)
*/

var Q = require('q');
var regInt = require('./lib/fetchParentASIN/regInt');
var fetchBookList = require('./lib/fetchParentASIN/fetchBookList');
var fetchBookListNotKindlized = require('./lib/inspectBookList/fetchBookListNotKindlized');
var inspectASIN = require('./lib/fetchParentASIN/inspectASIN');
var reduceAuthorityASIN = require('librarian/lib/fetchParentASIN/reduceAuthorityASIN');
var constant = require('../common/constant');
var reduceListByDate = require('common/reduceListByDate');

var inspectBook = require('./lib/inspectBookList/inspectBook');

var bookList = [];

var fetchParentASIN = function() {
  var d = Q.defer();
  Q.when(bookList)
    .then(fetchBookList)
    .then(reduceAuthorityASIN)
    .then(function(bookList) {
      var d = Q.defer();
      var data = {
        times: bookList.length,
        interval: constant.interval,
        bookList: bookList,
        d: d,
        callBack: function(data) {
          inspectASIN(data);
        }
      };
      regInt(data);
      return d.promise;
    })
    .done(function(bookList) {
      console.log(bookList.length, 'books in shelf.');
      d.resolve();
    });
  return d.promise;
};

var inspectBookList = function() {
  var d = Q.defer();
  console.log('inspectBookListの処理を開始');
  Q.when(bookList)
    .then(fetchBookListNotKindlized)
    .then(inspectBook)
    .done(function(bookList) {
      console.log(bookList.length, 'inspectBookListの処理を完了');
      d.resolve();
    });

  return d.promise;
};

module.exports = {
  fetchParentASIN: fetchParentASIN,
  inspectBookList: inspectBookList
};
