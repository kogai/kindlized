var Q = require('q');
var regInt = require('lib/fetchParentASIN/regInt');
var fetchBookList = require('lib/fetchParentASIN/fetchBookList');
var inspectASIN = require('lib/fetchParentASIN/inspectASIN');

module.exports = function() {
  var d = Q.defer();
  Q.when()
    .then(fetchBookList)
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
