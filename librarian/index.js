// #LIBRARIAN
// - 書籍DBのkindle化チェック
// - 書籍DBへの新刊追加

var Q               = require('q');
var regInt          = require('./lib/regInt');
var fetchBookList   = require('./lib/fetchBookList');
var inspectBookList = require('./lib/inspectBookList');
var constant        = require('./lib/constant');

var bookList        = [];

Q.when( bookList )
.then( fetchBookList )
.then( function( bookList ){
  var d = Q.defer();
  var data = {
    times    : bookList.length,
    interval : 0,
    // interval : constant.interval,
    bookList: bookList,
    d: d,
    callBack : function( data ){
      inspectBookList( data.bookList[ data.countExec ] );
      data.countExec++;
      data.regularInterval( data );
    }
  };
  regInt( data );
  return d.promise;
})
.done( function( bookList ){
  console.log( bookList.length, 'books in shelf.' );
});
