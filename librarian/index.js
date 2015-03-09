// #LIBRARIAN
// - 書籍DBのkindle化チェック
// - 書籍DBへの新刊追加

var Q = require('q');
var regInt = require('./lib/regInt');

var data = {
  times    : 10,
  interval : 300,
  obj      : {},
  callBack : function( data ){
    data.countExec++;
    data.regularInterval( data );
  }
};



regInt( data );
