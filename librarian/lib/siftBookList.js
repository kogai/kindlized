var Q      = require('q');
var moment = require('moment-timezone');

module.exports = function( bookList ){
  var d = Q.defer();
  callBack = function( bookList ){
    var siftedBookList = [];
    for (var i = 0; i < bookList.length; i++) {
      var lastModifyTime = bookList[i]._id.getTimestamp();
          lastModifyTime = moment( lastModifyTime );
      // @todo
      // 1日以内に調査されていなかったらキューに入れる
      // console.log( lastModifyTime );
    }
    siftedBookList = bookList;
    d.resolve( siftedBookList );
  };
  callBack( bookList );
  return d.promise;
};
