// #LIBRARIAN
// - 書籍DBのkindle化チェック
// - 書籍DBへの新刊追加

var Q               = require('q');
var regInt          = require('./lib/regInt');
var fetchBookList   = require('./lib/fetchBookList');
var siftBookList    = require('./lib/siftBookList');
var inspectBook     = require('./lib/inspectBook');
var constant        = require('../common/constant');

var bookList        = [];

var fetchParentASIN = function(){
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
        inspectBook( data );
      }
    };
    regInt( data );
    return d.promise;
  })
  .done( function( bookList ){
    console.log( bookList.length, 'books in shelf.' );
  });
}

fetchParentASIN();
