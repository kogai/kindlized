// #LIBRARIAN
// - 書籍DBのkindle化チェック
// - 書籍DBへの新刊追加

/*

parentsASIN-RelatedItemsのチェックが失敗してるっぽい
- [ ] シドニアの騎士(10)
- [ ] 青空エール 3 (マーガレットコミックス)
- [ ] 姉の結婚 2 (フラワーコミックスアルファ)

*/

var Q               = require('q');
var regInt          = require('./lib/fetchParentASIN/regInt');
var fetchBookList   = require('./lib/fetchParentASIN/fetchBookList');
var inspectASIN     = require('./lib/fetchParentASIN/inspectASIN');
var constant        = require('../common/constant');
var reduceListByDate = require('common/reduceListByDate');

var inspectBook     = require( './lib/inspectBookList/inspectBook' );
var siftBookList    = require('./lib/inspectBookList/siftBookList');

var bookList        = [];

var fetchParentASIN = function(){
  var d = Q.defer();
  Q.when( bookList )
  .then( fetchBookList )
  .then( function( bookList ){
    var d = Q.defer();
    var data = {
      times    : bookList.length,
      interval : constant.interval,
      bookList: bookList,
      d: d,
      callBack : function( data ){
        inspectASIN( data );
      }
    };
    regInt( data );
    return d.promise;
  })
  .done( function( bookList ){
    console.log( bookList.length, 'books in shelf.' );
    d.resolve();
  });
  return d.promise;
}

var inspectBookList = function(){
  var d = Q.defer();
  console.log( '処理を開始' );
  Q.when( bookList )
  .then( fetchBookList )
  .then( siftBookList )
  .then( inspectBook )
  .done( function( bookList ){
    console.log( bookList.length, 'inspectBookList is completed.');
    d.resolve();
  });

  return d.promise;
};

module.exports = {
    fetchParentASIN: fetchParentASIN,
    inspectBookList: inspectBookList
};
inspectBookList();
