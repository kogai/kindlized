var Q = require('q');
var constant = require('common/constant');
var regInt = require('librarian/lib/fetchParentASIN/regInt');
var fetchBookList = require('librarian/lib/fetchParentASIN/fetchBookList');
var inspectASIN = require('librarian/lib/fetchParentASIN/inspectASIN');
var log = require('common/log');

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
      log.info('fetchParentASINが完了');
      d.resolve();
    });
  return d.promise;
};

/*
AuthorityASINに有効な値がないbookListを取得する -> fetchBookList
ASINからItemLookupでAmazon-apiから書籍データを取得する
book毎に以下のオブジェクトを作って一時保存用配列に格納する
{
  _id: _id,
  ASIN: ASIN,
  AuthorityASIN: AuthorityASIN,
}
ASINでfindOneAndUpdateでAuthorityASINを保存する
*/
